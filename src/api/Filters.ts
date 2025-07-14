export interface Filters {
    page: number;
    limit: number;
    genres?: string[];
    ratingMin?: number;
    ratingMax?: number;
    yearFrom?: number;
    yearTo?: number;
}