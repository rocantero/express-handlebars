export class DealsDTO {
  constructor({ id, created_at, updated_at, site_id, slug, title, url, listing_date, last_updated, date, last_seen_on, removed, status, type, price, revenue, income }) {
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.site_id = site_id;
    this.slug = slug;
    this.title = title;
    this.url = url;
    this.listing_date = listing_date;
    this.last_updated = last_updated;
    this.date = date;
    this.last_seen_on = last_seen_on;
    this.removed = removed;
    this.status = status;
    this.type = type;
    this.price = price;
    this.revenue = revenue;
    this.income = income;
  }
}