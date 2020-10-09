<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'task', 'done'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];
}
