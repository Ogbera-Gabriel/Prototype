'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required'
    }),
    companyName: z.string().min(1, {
        message: 'Company Name is required'
    }),
    deliveryAddress: z.string().min(1, {
        message: 'Delivery Address is required'
    }),
    telephone: z.string().regex(phoneRegex, 'Invalid Number!'),
    email: z.string().email({
        message: 'Invalid email address'
    })
})

export const FormModal = () =>{
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: '',
        companyName: '',
        deliveryAddress: '',
        telephone: '',
        email: '',
      }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
       console.log(values)
    }

    return (
        <Dialog open>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
               <DialogHeader className='pt-8 px-6'>
                   <DialogTitle className='text-2xl font-bold'>
                      Input your details
                   </DialogTitle>
                   <DialogDescription className='text-zinc-500'>
                     Please fill the form below
                   </DialogDescription>
               </DialogHeader>
               <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='space-y-8 px-6'>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='uppercase text-xs font-bold text-zinc-500'>
                Name
              </FormLabel>
              <FormControl>
                <Input  
                 disabled={isLoading}
                 className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                 placeholder='Enter your Name'
                 {...field}
                />
              </FormControl>
             
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='uppercase text-xs font-bold text-zinc-500'>
                Company Name
              </FormLabel>
              <FormControl>
                <Input  
                 disabled={isLoading}
                 className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                 placeholder= "Enter your Company's name"
                 {...field}
                />
              </FormControl>
             
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="deliveryAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='uppercase text-xs font-bold text-zinc-500'>
                Delivery Address
              </FormLabel>
              <FormControl>
                <Input  
                 disabled={isLoading}
                 className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                 placeholder='Enter your Delivery address'
                 {...field}
                />
              </FormControl>
             
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='uppercase text-xs font-bold text-zinc-500'>
                Telephone Number
              </FormLabel>
              <FormControl>
                <Input  
                 disabled={isLoading}
                 className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                 placeholder='Enter your Telephone Number'
                 {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='uppercase text-xs font-bold text-zinc-500'>
                Email
              </FormLabel>
              <FormControl>
                <Input  
                 disabled={isLoading}
                 className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                 placeholder='Enter your Email Address'
                 {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        </div>
        <DialogFooter className='bg-gray-100 px-6 py-4'>
            <Button disabled={isLoading}>Submit</Button>
        </DialogFooter>
     </form>
    </Form>
         </DialogContent>
    </Dialog>
    )
}

