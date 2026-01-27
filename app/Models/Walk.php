<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Walk extends Model
{
    /** @use HasFactory<\Database\Factories\WalkFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'route',
        'start_time',
        'end_time',
        'distance',
        'average_speed',
        'duration',
    ];

    protected function casts(): array
    {
        return [
            'route' => 'array',
            'start_time' => 'datetime',
            'end_time' => 'datetime',
            'distance' => 'decimal:2',
            'average_speed' => 'decimal:2',
            'duration' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
