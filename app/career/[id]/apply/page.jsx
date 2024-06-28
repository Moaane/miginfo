"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loader from "@/components/loader/Loader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = "application/pdf";

const formSchema = z.object({
  fullname: z.string().min(1, "Nama lengkap dibutuhkan"),
  gender: z.string().min(1, "Jenis kelamin dibutuhkan"),
  religion: z.string().min(1, "Agama dibutuhkan"),
  dateBirth: z.date({ required_error: "Tanggal lahir dibutuhkan" }),
  placeBirth: z.string().min(1, "Tempat lahir dibutuhkan"),
  province: z.string().min(1, "Provinsi dibutuhkan"),
  regency: z.string().min(1, "Kabupaten / kota dibutuhkan"),
  district: z.string().min(1, "Kecamatan dibutuhkan"),
  village: z.string().min(1, "Kelurahan dibutuhkan"),
  address: z.string().min(1, "Alamata dibutuhkan"),
  formalEducation: z.string().min(1, "Pendidikan formal dibutuhkan"),
  institution: z.string().min(1, "Institusi dibutuhkan"),
  faculty: z.string().min(1, "Fakultas dibutuhkan"),
  major: z.string().min(1, "Jurusan dibutuhkan"),
  gpa: z.string().min(1, "IPK dibutuhkan"),
  marital: z.string().min(1, "Status pernikahan dibutuhkan dibutuhkan"),
  email: z.string().min(1, "Email dibutuhkan").email("Emaili tidak valid"),
  idCard: z.string().min(1, "NIK dibutuhkan").max(16, "NIK maksimal 16 digit"),
  phoneNumber: z.string().min(1, "Nomor telepon dibutuhkan"),

  company: z.string(),
  companyCity: z.string(),
  position: z.string(),
  lengthWork: z.string(),
  reasonLeaving: z.string(),

  resume: z
    .any()
    .refine((resume) => {
      console.log(resume.length);
      if (resume.length === 0) return false; // File is required
      return true;
    }, "File is required.")
    .refine((resume) => {
      return resume[0]?.size <= MAX_FILE_SIZE;
    }, `Max resume size is 5MB.`)
    .refine((resume) => {
      return ACCEPTED_FILE_TYPES === resume[0]?.type;
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
});

export default function page({ params }) {
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const [selectedDate, setselectedDate] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [regencies, setRegencies] = useState(null);
  const [selectedRegency, setSelectedRegency] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [villages, setVillages] = useState(null);
  const [work, setWork] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      gender: "",
      dateBirth: null,
      placeBirth: "",
      religion: "",
      province: "",
      regency: "",
      district: "",
      village: "",
      address: "",
      formalEducation: "",
      institution: "",
      faculty: "",
      major: "",
      gpa: "",
      marital: "",
      email: "",
      idCard: "",
      phoneNumber: "",

      company: "",
      companyCity: "",
      lengthWork: "",
      position: "",
      reasonLeaving: "",

      resume: "",
    },
  });

  const fileRef = form.register("resume");

  async function onSubmit(data) {
    try {
      console.log("data", data);
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("gender", data.gender);
      formData.append("dateBirth", data.dateBirth);
      formData.append("placeBirth", data.placeBirth);
      formData.append("religion", data.religion);
      formData.append("province", data.province);
      formData.append("regency", data.regency);
      formData.append("district", data.district);
      formData.append("village", data.village);
      formData.append("address", data.address);
      formData.append("formalEducation", data.formalEducation);
      formData.append("institution", data.institution);
      formData.append("faculty", data.faculty);
      formData.append("major", data.major);
      formData.append("gpa", data.gpa);
      formData.append("marital", data.marital);
      formData.append("email", data.email);
      formData.append("idCard", data.idCard);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("resume", data.resume[0]);
      formData.append("careerId", id);

      if (work) {
        formData.append("company", data.company);
        formData.append("companyCity", data.companyCity);
        formData.append("position", data.position);
        formData.append("lengthWork", data.lengthWork);
        formData.append("reasonLeaving", data.reasonLeaving);
      }

      const response = await fetch("/api/application", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      switch (result.status) {
        case 201:
          toast.success("Lamaran telah terkirim");
          router.push("/");
          break;
        case 400:
        case 500:
          toast.error("Error saat mengirim lamaran");
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchProvinces() {
    try {
      const response = await fetch(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
        {
          method: "GET",
        }
      );

      const result = await response.json();
      setProvinces(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchRegencies(provinceId) {
    try {
      const response = await fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`,
        {
          method: "GET",
        }
      );

      const result = await response.json();
      setRegencies(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchDistricts(regencyId) {
    try {
      const response = await fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`,
        {
          method: "GET",
        }
      );

      const result = await response.json();
      setDistricts(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchVillages(districtId) {
    try {
      const response = await fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`,
        {
          method: "GET",
        }
      );

      const result = await response.json();
      setVillages(result);
    } catch (error) {}
  }

  function handleBirthDateChange(value) {
    console.log(value);
    setselectedDate(value);
    const formattedDate = format(value, "dd-MM-yyyy");
    form.setValue("birthDate", formattedDate);
  }

  function handleProvinceChange(value) {
    const province = provinces.find((province) => province.id === value);
    setSelectedProvince(value);
    form.setValue("province", province.name);
  }

  function handleRegencyChange(value) {
    const regency = regencies.find((regency) => regency.id === value);
    setSelectedRegency(value);
    form.setValue("regency", regency.name);
  }

  function handleDistrictChange(value) {
    const district = districts.find((district) => district.id === value);
    setSelectedDistrict(value);
    form.setValue("district", district.name);
  }

  useEffect(() => {
    fetchProvinces();
    if (selectedProvince) {
      fetchRegencies(selectedProvince);
    }
    if (selectedRegency) {
      fetchDistricts(selectedRegency);
    }
    if (selectedDistrict) {
      fetchVillages(selectedDistrict);
    }
  }, [selectedProvince, selectedRegency, selectedDistrict]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="mt-6 lg:mt-20 grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto w-full max-w-7xl grid flex-1 auto-rows-max gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card
                  className="bg-white/85 gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"
                  x-chunk="dashboard-07-chunk-0"
                >
                  <CardHeader>
                    <CardTitle>Application Form</CardTitle>
                    {/* <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription> */}
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <p className="lg:col-span-2 opacity-50 text-sm">
                        Data Diri
                      </p>
                      <div className="grid gap-3 ">
                        <FormField
                          control={form.control}
                          name="fullname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Nama Lengkap{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  name="fullname"
                                  className="w-full"
                                  placeholder="Masukkan nama lengkap anda"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3 ">
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Jenis Kelamin{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={(value) => field.onChange(value)}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger
                                    id="gender"
                                    aria-label="Select gender"
                                  >
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="laki-laki">
                                    Laki-laki
                                  </SelectItem>
                                  <SelectItem value="perempuan">
                                    Perempuan
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="religion"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel>
                                Agama <span className="text-red-500">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger
                                    id="religion"
                                    aria-label="Select religion"
                                  >
                                    <SelectValue placeholder="Select religion" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="islam">Islam</SelectItem>
                                  <SelectItem value="kristen">
                                    Kristen
                                  </SelectItem>
                                  <SelectItem value="katolik">
                                    Katolik
                                  </SelectItem>
                                  <SelectItem value="hindu">Hindu</SelectItem>
                                  <SelectItem value="buddha">Buddha</SelectItem>
                                  <SelectItem value="khonghucu">
                                    Khonghucu
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="dateBirth"
                          render={({ field }) => (
                            <FormItem className="flex flex-col justify-between pt-2">
                              <FormLabel>
                                Tanggal Lahir
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "dd-MM-yyyy")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    captionLayout="dropdown-buttons"
                                    fromYear={1960}
                                    toYear={2030}
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3 ">
                        <FormField
                          control={form.control}
                          name="placeBirth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Tempat Lahir{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  name="placeBirth"
                                  className="w-full"
                                  placeholder="Masukkan tempat lahir anda"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="province"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel>
                                Provinsi
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={(value) =>
                                  handleProvinceChange(value)
                                }
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger
                                    id="province"
                                    aria-label="Select provincy"
                                  >
                                    <SelectValue placeholder="Pilih provinsi" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {provinces.map((province) => (
                                    <SelectItem
                                      key={province.id}
                                      value={province.id}
                                    >
                                      {province.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="regency"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel>
                                Kabupaten / Kota
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={(value) =>
                                  handleRegencyChange(value)
                                }
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger
                                    id="regency"
                                    aria-label="Select regency"
                                  >
                                    <SelectValue placeholder="Pilih kabupaten / kota" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectGroup>
                                    {regencies ? (
                                      <></>
                                    ) : (
                                      <SelectLabel>
                                        Pilih Provinsi Dahulu
                                      </SelectLabel>
                                    )}
                                    {regencies?.map((regency) => (
                                      <SelectItem
                                        key={regency.id}
                                        value={regency.id}
                                      >
                                        {regency.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="district"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel>
                                Kecamatan
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={(value) =>
                                  handleDistrictChange(value)
                                }
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger
                                    id="district"
                                    aria-label="Select district"
                                  >
                                    <SelectValue placeholder="Pilih kecamatan" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>North America</SelectLabel>
                                    {districts?.map((district) => (
                                      <SelectItem
                                        key={district.id}
                                        value={district.id}
                                      >
                                        {district.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="village"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel>
                                Kelurahan
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger
                                    id="village"
                                    aria-label="Select village"
                                  >
                                    <SelectValue placeholder="Pilih kelurahan" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {villages?.map((village) => (
                                    <SelectItem
                                      key={village.id}
                                      value={village.name}
                                    >
                                      {village.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-3 ">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Alamat <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  name="address"
                                  className="w-full"
                                  placeholder="Masukkan alamat anda"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3 ">
                        <FormField
                          control={form.control}
                          name="marital"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Status Pernikahan
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger
                                    id="marital"
                                    aria-label="Select marital"
                                  >
                                    <SelectValue placeholder="Pilih status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="true">Menikah</SelectItem>
                                  <SelectItem value="false">
                                    Tidak Menikah
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3 ">
                        <FormField
                          control={form.control}
                          name="idCard"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                NIK <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  name="idCard"
                                  className="w-full"
                                  type="number"
                                  placeholder="Masukkan NIK anda"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3 ">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Email <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  name="email"
                                  className="w-full"
                                  placeholder="Masukkan email anda"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3 ">
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Nomor Telepon{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  name="phoneNumber"
                                  className="w-full"
                                  type="number"
                                  placeholder="Masukkan nomor telepon anda"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                              <FormDescription>
                                contoh : 08517xxxx
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </div>
                      <p className="lg:col-span-2 opacity-50 text-sm">
                        Pendidikan
                      </p>
                      <div className="grid gap-3 ">
                        <FormField
                          control={form.control}
                          name="formalEducation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Pendidikan Formal{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  name="formalEducation"
                                  className="w-full"
                                  placeholder="Masukkan pendidikan formal anda"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3 ">
                        <FormField
                          control={form.control}
                          name="institution"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Institusi{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  name="insititution"
                                  className="w-full"
                                  placeholder="Masukkan institusi anda"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3 ">
                        <FormField
                          control={form.control}
                          name="faculty"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Fakultas
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  name="faculty"
                                  className="w-full"
                                  placeholder="Masukkan fakultas anda"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3 ">
                        <FormField
                          control={form.control}
                          name="major"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Jurusan <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  name="major"
                                  className="w-full"
                                  placeholder="Masukkan jurusan anda"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3 ">
                        <FormField
                          control={form.control}
                          name="gpa"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                IPK <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  name="gpa"
                                  className="w-full"
                                  type="number"
                                  step="0.1"
                                  max="4"
                                  placeholder="Masukkan IPK anda"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3 ">
                        <FormField
                          control={form.control}
                          name="work"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Pernah Bekerja{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={(value) =>
                                  setWork(value === "true")
                                }
                                defaultValue="false"
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Pilih Status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="true">Ya</SelectItem>
                                  <SelectItem value="false">Tidak</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {work && (
                        <>
                          <p className="lg:col-span-2 opacity-50 text-sm">
                            Pekerjaan Terakhir
                          </p>
                          <div className="grid gap-3 ">
                            <FormField
                              control={form.control}
                              name="company"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Nama Perusahaan{" "}
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      name="company"
                                      className="w-full"
                                      placeholder="Masukkan nama perusahaan anda"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3 ">
                            <FormField
                              control={form.control}
                              name="companyCity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Kota Perusahaan{" "}
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      name="companyCity"
                                      className="w-full"
                                      placeholder="Masukkan kota perusahaan anda"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3 ">
                            <FormField
                              control={form.control}
                              name="position"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Posisi Terakhir{" "}
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      name="position"
                                      className="w-full"
                                      placeholder="Masukkan posisi terakhir anda"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3 ">
                            <FormField
                              control={form.control}
                              name="lengthWork"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Lama Bekerja ( tahun ){" "}
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      className="w-full"
                                      type="number"
                                      min="1"
                                      placeholder="Masukkan lama bekerja anda"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3 ">
                            <FormField
                              control={form.control}
                              name="reasonLeaving"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Alasan Keluar{" "}
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <Textarea
                                    id="reasonLeaving"
                                    className="min-h-32"
                                    placeholder="masukkan alasan keluar anda"
                                    {...field}
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </>
                      )}
                      <div className="grid gap-3 ">
                        <FormField
                          control={form.control}
                          name="resume"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Resume</FormLabel>
                              <FormControl>
                                <Input
                                  id="resume"
                                  type="file"
                                  accept="application/pdf"
                                  {...fileRef}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid gap-3 mt-6">
                      <Button variant="primary" size="lg" className="px-4 font-semibold tracking-wide text-[16px]">
                        Lamar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </Form>
          </div>
        </main>
      )}
    </>
  );
}
