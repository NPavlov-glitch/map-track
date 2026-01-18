<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Walk;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a specific test user with 5 walks
        User::factory()
            ->has(Walk::factory()->count(5))
            ->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create 10 more random users, each with 3 walks
        User::factory(10)
            ->has(Walk::factory()->count(3))
            ->create();
    }
}
