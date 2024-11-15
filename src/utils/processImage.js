export const imageStringToBlob = async (imageString) => {
    try {
        const decodedData = atob(imageString);
        const bytes = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; i++) {
            bytes[i] = decodedData.charCodeAt(i);
        }
        return new Blob([bytes], { type: 'image/jpeg' });
    } catch (error) {
        throw new Error(`Error processing string: ${error}`)
    }
};

export const blobToImageString = async (blob) => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                resolve(base64String)
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.log('Error creating image: ', error)
            reject(error)
        }
    })
};