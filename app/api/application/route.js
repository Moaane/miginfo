import prisma from "@/utils/db";
import { format } from "date-fns";
import { NextResponse } from "next/server";
import { CreateImage } from "../images/route";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const page = parseInt(searchParams.get("page"), 10);

    if (page) {
      const skip = page ? (page > 0 ? 10 * (page - 1) : 0) : 0;

      const [data, total] = await Promise.all([
        prisma.application.findMany({
          skip,
          take: 10,
          include: {
            careers: { select: { id: true, position: true } },
          },
        }),
        prisma.application.count(),
      ]);
      const lastPage = Math.ceil(total / 10);

      return NextResponse.json({
        meta: {
          total: total,
          lastPage: lastPage,
          currentPage: page,
          perPage: 10 || total,
          prev: page && page > 1 ? page - 1 : null,
          next: page && page < lastPage ? page + 1 : null,
        },
        data: data,
        status: 200,
        message: " Applications retrieved successfully",
      });
    }

    const applications = await prisma.application.findMany();
    return NextResponse.json({
      data: applications,
      status: 200,
      message: "Applications retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while retrieving applications ",
    });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const fullname = formData.get("fullname");
    const gender = formData.get("gender");
    const dateBirth = format(formData.get("dateBirth"), "dd-MM-yyyy");
    const placeBirth = formData.get("placeBirth");
    const religion = formData.get("religion");
    const province = formData.get("province");
    const regency = formData.get("regency");
    const district = formData.get("district");
    const village = formData.get("village");
    const address = formData.get("address");
    const formalEducation = formData.get("formalEducation");
    const institution = formData.get("institution");
    const faculty = formData.get("faculty");
    const major = formData.get("major");
    const gpa = parseFloat(formData.get("gpa"), 10);
    const marital = formData.get("marital") === "true";
    const email = formData.get("email");
    const idCard = formData.get("idCard");
    const phoneNumber = formData.get("phoneNumber");

    const company = formData.get("company") || null;
    const companyCity = formData.get("companyCity") || null;
    const position = formData.get("position") || null;
    const lengthWork = formData.get("lengthWork") || null;
    const reasonLeaving = formData.get("reasonLeaving") || null;

    const resume = formData.get("resume");

    const resumeName = `${fullname.toLowerCase().replace(/\s+/g, "-")}-resume`;
    const resumeData =
      resume && resume instanceof Blob
        ? await CreateImage(resume, resumeName)
        : null;

    const newApplication = await prisma.application.create({
      data: {
        fullname: fullname,
        gender: gender,
        dateBirth: dateBirth,
        placeBirth: placeBirth,
        religion: religion,
        province: province,
        regency: regency,
        district: district,
        village: village,
        address: address,
        formalEducation: formalEducation,
        institution: institution,
        faculty: faculty,
        major: major,
        gpa: gpa,
        marital: marital,
        email: email,
        idCard: idCard,
        phoneNumber: phoneNumber,
        company: company,
        companyCity: companyCity,
        position: position,
        lengthWork: lengthWork,
        reasonLeaving: reasonLeaving,
        resume: resumeData,
      },
    });

    return NextResponse.json({
      data: newApplication,
      status: 201,
      message: "Application created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while creating application",
    });
  }
}
