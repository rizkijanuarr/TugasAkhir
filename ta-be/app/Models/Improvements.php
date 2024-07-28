<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Improvements extends Model
{
    use HasFactory;

    /**
    * GUARDED ATTRIBUTES
    */
    protected $guarded = [];

    //  MANY KE MANY KE TABLE FEEDBACK
    public function feedback()
    {
        return $this->belongsToMany(Feedback::class, 'feedback_improvements', 'feedback_id', 'improvement_id');
    }
}
