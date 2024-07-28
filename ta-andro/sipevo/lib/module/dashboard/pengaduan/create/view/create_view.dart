import 'dart:io';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:sipevo/core.dart';

class CreateView extends StatelessWidget {
  const CreateView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetBuilder<CreateController>(
      init: CreateController(),
      builder: (controller) {
        controller.view = this;

        return Theme(
          data: ThemeData(
            primaryColor: const Color(0xff0f9565),
            scaffoldBackgroundColor: Colors.white,
            elevatedButtonTheme: ElevatedButtonThemeData(
              style: ElevatedButton.styleFrom(
                elevation: 0,
                backgroundColor: AppColors.baseColor,
                shape: const StadiumBorder(),
                maximumSize: const Size(double.infinity, 56),
                minimumSize: const Size(double.infinity, 56),
              ),
            ),
            inputDecorationTheme: InputDecorationTheme(
              filled: true,
              fillColor: Colors.grey[100],
              iconColor: AppColors.baseColor,
              prefixIconColor: AppColors.baseColor,
              contentPadding:
                  const EdgeInsets.symmetric(horizontal: 16.0, vertical: 16.0),
              border: const OutlineInputBorder(
                borderRadius: BorderRadius.all(Radius.circular(30)),
                borderSide: BorderSide.none,
              ),
            ),
          ),
          child: Scaffold(
            appBar: AppBar(
              title: const Text("Create"),
              backgroundColor: AppColors.baseColor,
              titleTextStyle: TextStyle(
                color: Colors.white,
                fontSize: 16.0,
                fontWeight: FontWeight.bold,
              ),
              iconTheme: IconThemeData(
                color: Colors.white,
              ),
            ),
            body: SingleChildScrollView(
              child: Container(
                padding: const EdgeInsets.all(20.0),
                child: Form(
                  key: controller.formKey,
                  child: Column(
                    children: [
                      // VIEW FOTO
                      InkWell(
                        onTap: () async {
                          try {
                            XFile? image = await ImagePicker().pickImage(
                              source: ImageSource.camera,
                              imageQuality: 40,
                            );
                            if (image != null) {
                              var imageFile = File(image.path);
                              final fileSize = await imageFile.length();
                              if (fileSize > 2000000) {
                                // lebih dari 2MB
                                print('Error: File size exceeds 2MB');
                                return;
                              }
                              controller.selectedImage = image;
                              controller.update();
                            }
                          } catch (e) {
                            print("Error selecting image from camera: $e");
                          }
                        },
                        child: Column(
                          children: [
                            if (controller.selectedImage != null) ...[
                              ClipRRect(
                                borderRadius: BorderRadius.circular(20.0),
                                child: Image.file(
                                  File(controller.selectedImage!.path),
                                  fit: BoxFit.cover,
                                  width: 200.0,
                                  height: 200.0,
                                ),
                              ),
                            ],
                            const SizedBox(
                              height: 20.0,
                            ),
                            TextFormField(
                              controller: controller.photoController,
                              enabled: false,
                              decoration: const InputDecoration(
                                labelText: 'Photo',
                                labelStyle: TextStyle(
                                  color: Colors.blueGrey,
                                ),
                                enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(
                                    color: Colors.blueGrey,
                                  ),
                                ),
                                suffixIcon: Padding(
                                  padding: EdgeInsets.only(
                                    right: 16.0,
                                  ),
                                  child: Icon(Icons.image),
                                ),
                              ),
                              onChanged: (value) {},
                            ),
                          ],
                        ),
                      ),
                      // VIEW FOTO
                      const SizedBox(
                        height: 20.0,
                      ),
                      DropdownButtonFormField<String>(
                        items: controller.categories.map((category) {
                          return DropdownMenuItem<String>(
                            value: category.id.toString(),
                            child: Text(category.name),
                          );
                        }).toList(),
                        onChanged: controller.onCategoryChanged,
                        value: controller.selectedCategory,
                        decoration:
                            const InputDecoration(labelText: 'Category'),
                      ),
                      const SizedBox(
                        height: 20.0,
                      ),
                      TextFormField(
                        controller: controller.titleController,
                        decoration: const InputDecoration(labelText: 'Title'),
                      ),
                      const SizedBox(
                        height: 20.0,
                      ),
                      TextFormField(
                        controller: controller.descriptionController,
                        decoration:
                            const InputDecoration(labelText: 'Description'),
                      ),
                      const SizedBox(
                        height: 20.0,
                      ),
                      TextFormField(
                        controller: controller.locationController,
                        decoration:
                            const InputDecoration(labelText: 'Location'),
                      ),
                      const SizedBox(
                        height: 20.0,
                      ),
                      Hero(
                        tag: "simpan",
                        child: ElevatedButton(
                          onPressed: () async {
                            controller.submit();
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.baseColor,
                          ),
                          child: Text(
                            "Tambahkan".toUpperCase(),
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
