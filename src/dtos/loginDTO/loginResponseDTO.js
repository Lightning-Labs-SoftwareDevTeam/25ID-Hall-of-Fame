class LoginResponseDTO {
    constructor(data) {
        this.token = data.token || null;
    }

    getToken() {
        return this.token;
    }
}

export default LoginResponseDTO;
