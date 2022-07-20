export type CarBrandType = {
  id?: number;
  cName?: string;
  eName?: string;
  brandType?: string;
  country?: string;
  brandCreateTime?: string;
  description?: string;
  sort?: string;
  isHot?: string;
  status?: string;
}

export type CarBrandListData = {
  list?: CarBrandType[];
  count?: number;
}
