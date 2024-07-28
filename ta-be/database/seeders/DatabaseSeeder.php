<?php

namespace Database\Seeders;

use App\Models\Improvements;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    // TEMPAT REGISTER SEEDER
    public function run()
    {
        $this->call(RolesTableSeeder::class);
        $this->call(PermissionsTableSeeder::class);
        $this->call(UserIdentifiesSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(PengaduanCategoriesTableSeeder::class);
        $this->call(PengaduanStatusTableSeeder::class);
        $this->call(ImprovementsTableSeeder::class);
    }
}
