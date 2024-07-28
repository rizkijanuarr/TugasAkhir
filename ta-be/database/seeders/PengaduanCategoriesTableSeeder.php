<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PengaduanCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            [
                'image' => 'Sarana.jpeg',
                'name' => 'Sarana',
            ],
            [
                'image' => 'Prasarana.jpeg',
                'name' => 'Prasarana',
            ],
            [
                'image' => 'Danau.jpeg',
                'name' => 'Danau',
            ],
            [
                'image' => 'Kantin.jpg',
                'name' => 'Kantin',
            ],
            [
                'image' => 'Parkiran.jpg',
                'name' => 'Parkiran',
            ],
        ];

        foreach ($categories as $category) {
            DB::table('pengaduan_categories')->insert([
                'image' => $category['image'],
                'name' => $category['name'],
                'slug' => Str::slug($category['name'], '-'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
