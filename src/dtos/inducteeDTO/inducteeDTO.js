import { imageStringToBlob } from "../../utils/processImage";

class InducteeDTO {
    constructor(id, name, rank, unit, place, date, category, citation, image) {
        this.id = id
        this.name = name;
        this.rank = rank;
        this.unit = unit;
        this.place = place;
        this.date = date;
        this.category = category;
        this.citation = citation;
        this.image = image;
    }

    updateField(fieldName, value) {
        this[fieldName] = value;
    }

    async createBody() {
        const formData = new FormData();
        formData.append('name', this.name);
        formData.append('rank', this.rank);
        formData.append('unit', this.unit);
        if (this.place) {
            formData.append('place', this.place);
        }
        if (this.date) {
            formData.append('date', this.date);
        }
        if (this.category) {
            formData.append('category', this.category);
        }
        formData.append('citation', this.citation);
        if (this.image) {
            const blob = await imageStringToBlob(this.image);
            const file = new File([blob], "image.jpg", { type: "image/jpeg" });
            formData.append('image', file);
        }
        return formData;
    }

    static fromData(data) {
        return new InducteeDTO(
            data.id,
            data.name,
            data.rank,
            data.unit,
            data.place || null,
            data.date || null,
            data.category || null,
            data.citation,
            data.image || null
        );
    }
}

export default InducteeDTO;