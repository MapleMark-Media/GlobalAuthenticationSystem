import { url } from "inspector";
import ServiceRequest from "../Models/ServiceRequest";

const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

export async function getRedirect(serviceRequest: ServiceRequest): Promise<string | null>{
    const service = await prisma.webservice.findUnique({
        where: {
            serviceName: serviceRequest.serviceName
        },
        select:{
            url: true,
            serviceName: false,
        },
    })
    if (service == null){
        return null;
    }
    return service['url'];
}

export async function addSite(serviceRequest: ServiceRequest, url: string): Promise<boolean>{
    await prisma.webservice.create({
        data: { serviceName: serviceRequest.serviceName, url: url }
    });
    return true;
}

export async function updateUrl(serviceRequest: ServiceRequest, url: string): Promise<boolean>{
    try {
        await prisma.webservice.update({
            where: {serviceName: serviceRequest.serviceName},
            data: {url: url},
        })
        return true;
    }catch(e){
        return false;
    }
}