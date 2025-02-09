"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {Form, FormControl} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patients.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"
 

const RegisterForm = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 

  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
       const userData = {name, email, phone};

       const user = await createUser(userData);

       if(user) router.push(`/patients/${user.id}/register`)
    } catch (error) {
        console.log(error); 
    }
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
            <section className="space-y-4">
                <h1>Welcome</h1>
                <p className="text-dark-700">Let us know more about yourself.</p>
            </section>

            <section className="space-y-6">
                <div className="mb-9 space-y-1">
                    <h2 className="sub-header">Personal Information</h2>
                </div>
            </section>

            <CustomFormField 
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name"
                label="Full Name"
                placeholder="John Doe"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField 
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="donkorjonas@gmail.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />

                <CustomFormField 
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone Number"
                    placeholder="(+233)203409081"
                />
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField 
                    fieldType={FormFieldType.DATE_PICKER}
                    control={form.control}
                    name="birthDate"
                    label="Birth Date"
                />

                <CustomFormField 
                    fieldType={FormFieldType.SKELETON}
                    control={form.control}
                    name="gender"
                    label="Gender"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <RadioGroup className="flex gap-6 h-11 xl:justify-between"
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                                {GenderOptions.map((option)=> (
                                    <div key={option} className="radio-group">
                                        <RadioGroupItem value={option} id={option} />
                                        <Label htmlFor={option} className="cursor-pointer"> {option}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    )}
                />
            </div>


            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField 
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="address"
                    label="Address"
                    placeholder="Ashaiman, Middle-East"
                />
                 <CustomFormField 
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="occupation"
                    label="Occupation"
                    placeholder="Software Engineer"
                />
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField 
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="emergencyContact"
                    label="Emergency Contact"
                    placeholder="(+233)203409081"
                />
                <CustomFormField 
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="bloodGroup"
                    label="Blood Group"
                    placeholder="O+"
                />
            </div>

            <section className="space-y-6">
                <div className="mb-9 space-y-1">
                    <h2 className="sub-header">Medical Information</h2>
                </div>
            </section>

                <CustomFormField 
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="primaryPhysician"
                    label="Primary Physician"
                    placeholder="Select a physician"
                >
                    {Doctors.map((doctor) => (
                       <SelectItem key={doctor.name} value={doctor.name}>
                        <div className="flex items-center gap-2">
                            <Image
                                src={doctor.image}
                                height={32}
                                width={32}
                                alt={doctor.name}
                                className="rounded-full border border-dark-400"
                            />
                            <p>{doctor.name}</p>
                        </div>
                       </SelectItem> 
                    ))}
                </CustomFormField>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField 
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="insuranceProvider"
                        label="Insurance Provider"
                        placeholder="BlueCross BlueShield"
                    />
                    <CustomFormField 
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="insurrancePolicyNumber"
                        label="Insurance Policy Number"
                        placeholder="AHD123456TP"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField 
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="allergies"
                        label="Allergies (if any)"
                        placeholder="Peanuts, Penicillin, Pollen"
                    />
                    <CustomFormField 
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="currentMedication"
                        label="Current medication (if any)"
                        placeholder="Ibuprofen 200mg, Paracetamol 500mg"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField 
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="familyMedicalHistory"
                        label="Family medical history"
                        placeholder="Mother had brain cancer"
                    />
                    <CustomFormField 
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="pastMedicalHistory"
                        label="Past medical history"
                        placeholder="Appendectomy, Tosillectomy"
                    />
                </div>

            <section className="space-y-6">
                <div className="mb-9 space-y-1">
                    <h2 className="sub-header">Identification and Verification</h2>
                </div>
            </section>

            <CustomFormField 
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="identificationType"
                    label="PIdentification Type"
                    placeholder="Select an identification type"
                >
                    {IdentificationTypes.map((type) => (
                       <SelectItem key={type} value={type}>
                         {type}
                       </SelectItem> 
                    ))}
            </CustomFormField>

            <CustomFormField 
               fieldType={FormFieldType.INPUT}
               control={form.control}
               name="identificationNumber"
               label="Identification Number"
               placeholder="123456789"
           />

            <CustomFormField 
                    fieldType={FormFieldType.SKELETON}
                    control={form.control}
                    name="identificationDocument"
                    label="Scanned copy of identification"
                    renderSkeleton={(field) => (
                       <FormControl>
                        <FileUploader
                            files={field.value}
                            onChange={field.onChange}
                        />
                       </FormControl>
                    )}
            />

            <section className="space-y-6">
                <div className="mb-9 space-y-1">
                    <h2 className="sub-header">Consent and Privacy</h2>
                </div>
            </section>

            <CustomFormField 
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="treatmentConsent"
                label="I consent to treatment"
            />
            <CustomFormField 
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="disclosureConsent"
                label="I consent to disclosure of information"
            />
            <CustomFormField 
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="privacyConsent"
                label="I consent to privacy policy"
            />


            <SubmitButton  isLoading={isLoading}>Get Started</SubmitButton>
        </form>
  </Form>
  )
}

export default RegisterForm