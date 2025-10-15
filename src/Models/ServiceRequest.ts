class ServiceRequest {
    public readonly serviceName: string;
    public readonly email: string;

    public constructor(serviceName: string, email: string){
        this.serviceName = serviceName;
        this.email = email;
    }
}

export default ServiceRequest;