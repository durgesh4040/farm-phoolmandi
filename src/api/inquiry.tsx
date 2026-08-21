import axiosServices from "@/lib/axios";

export function getInquiry(query?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/inquiries${query ?? ""}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getInquiryById(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/inquiries/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteInquiry(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .delete(`/api/inquiries/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export function createInquiry(values: unknown): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .post("/api/inquiries", values)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export function updateInquiry(id: number, values: unknown): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .put(`/api/inquiries/${id}`, values)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}