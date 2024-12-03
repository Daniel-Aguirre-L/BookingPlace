package com.rustik.rustik.service;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.rustik.rustik.model.Cabin;
import com.rustik.rustik.model.Image;
import com.rustik.rustik.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ImageService {

    private final ImageRepository imageRepository;
    private final Cloudinary cloudinary;


    @Autowired
    public ImageService(ImageRepository imageRepository, Cloudinary cloudinary) {
        this.imageRepository = imageRepository;
        this.cloudinary = cloudinary; // Usa el bean Cloudinary configurado
    }

    // Método para subir imagen y asociarla con una cabaña
    public Image uploadImage(Cabin cabin, MultipartFile file) {
        try {
            // Verifica que el archivo no esté vacío
            if (file.isEmpty()) {
                throw new IllegalArgumentException("El archivo está vacío");
            }

            Map<String,Object> uploadParams = ObjectUtils.asMap("folder", "cabin "+ cabin.getId());
            // Subir el archivo a Cloudinary
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadParams);
            String imageUrl = (String) uploadResult.get("url");
            String imageId  = (String) uploadResult.get("public_id");

            // Crear y guardar la entidad Image
            Image image = new Image();
            image.setUrl(imageUrl);
            image.setCabin(cabin);
            image.setImagePublicId(imageId);


            return imageRepository.save(image);
        } catch (IOException e) {
            throw new RuntimeException("Error al subir la imagen", e);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    public List<Image> uploadImages(Cabin cabin, List<MultipartFile> files) {
        List<Image> imageUrls = new ArrayList<>();

        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                try {
                    // Sube la imagen a Cloudinary
                    Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                            ObjectUtils.asMap("folder", "cabin " + cabin.getId()));
                    String url = (String) uploadResult.get("url");

                    // Crea un objeto Image y guarda la URL en la base de datos
                    Image image = new Image();
                    image.setUrl(url);
                    image.setImagePublicId((String) uploadResult.get("public_id")); // Guarda el ID público si lo necesitas

                    // Establece la cabaña
                    image.setCabin(cabin); // Asocia la imagen a la cabaña

                    imageUrls.add(imageRepository.save(image)); // Guarda la imagen en la base de datos
                    //System.out.println(imageUrls.get(0));

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return imageUrls;
    }

    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public Image findById(Long id) {
        return imageRepository.findById(id).orElse(null);
    }

    public boolean deleteImage(Long imageId) {
        if (!imageRepository.existsById(imageId)) {
            return false;
        }

        Image imageSelected = imageRepository.findById(imageId).get();
        Cabin cabin = imageSelected.getCabin();  // Obtén la cabaña asociada a la imagen

        // Verifica si la cabaña tiene más de 5 imágenes
        long imageCount = imageRepository.countByCabinId(cabin.getId());  // Cuenta cuántas imágenes tiene la cabaña

        if (imageCount <= 5) {
            throw new RuntimeException("No se puede eliminar la imagen, la cabaña debe tener al menos 5 imágenes.");
        }

        try {
            // Elimina la imagen de Cloudinary
            cloudinary.uploader().destroy(imageSelected.getImagePublicId(), ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new RuntimeException("Error al eliminar imagen", e);
        }

        // Elimina la imagen de la base de datos
        imageRepository.deleteById(imageId);
        return true;
    }

    public Boolean deleteImagesById( List<Long> imageIds) {
        try {
            imageRepository.deleteAllById(imageIds);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar imagenes", e);
        }



    }

    public List<Image> findImagesByCabin (Long cabinId){
        return imageRepository.findByCabinId(cabinId);
    }
}