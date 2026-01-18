<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Walk>
 */
class WalkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'name' => fake()->words(3, true),
            'route' => [
                ['lat' => fake()->latitude(), 'lng' => fake()->longitude()],
                ['lat' => fake()->latitude(), 'lng' => fake()->longitude()],
            ],
            'start_time' => fake()->dateTimeBetween('-1 month', 'now'),
            'end_time' => fake()->dateTimeBetween('now', '+1 month'),
            'distance' => fake()->randomFloat(2, 1, 20),
            'average_speed' => fake()->randomFloat(2, 3, 6),
        ];
    }
}
