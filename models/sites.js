export class SitesDTO {
  constructor({ id, created_at, updated_at, slug, title, url, listing_url }) {
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.slug = slug;
    this.title = title;
    this.url = url;
    this.listing_url = listing_url;
  }
}