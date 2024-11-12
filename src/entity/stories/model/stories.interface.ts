import BaseEntity from "../../../shared/types/base-entity.interface";

export default interface Story extends BaseEntity {
    title: string;
    description: string;
    image: string;
}