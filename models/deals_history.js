export class DealsHistoryDTO {
  constructor({ id, created_at, updated_at, deal_id, site_id, slug, title, url, date, removed, status, type, price, revenue, income }) {
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deal_id = deal_id;
    this.site_id = site_id;
    this.slug = slug;
    this.title = title;
    this.url = url;
    this.date = date;
    this.removed = removed;
    this.status = status;
    this.type = type;
    this.price = price;
    this.revenue = revenue;
    this.income = income;
  }
}