import http from '@/plugins/axios'

export interface Envelope {
  id: number;
  sn: string;
  user_id: number;
  amount: number;
  sum_condition: number;
  name: string;
  phone: string;
  begin_date: string;
  end_date: string;
  status: number;
  present_status: number;
  share_status: number;
  description_map: Descriptionmap;
  __v: number;
}

interface Descriptionmap {
  phone: string;
  online_paid_only: string;
  validity_delta: string;
  validity_periods: string;
  sum_condition: string;
}

export const getValidEnvelope = (id: number) => {
  return http.request<Envelope[]>({
    url: `promotion/v2/users/${id}/hongbaos?limit=20&offset=0`
  })
}