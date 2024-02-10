"use client";
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"



export function QuillForm({ field }: { field?: any }
) {

    const [value, setValue] = useState('');
    const [Loading, setLoading] = useState(false)
    const { toast } = useToast()




    return (

        <div className="w-full h-full ">
            <ReactQuill className='w-full' theme="snow" {...field} />

        </div>


    )
}