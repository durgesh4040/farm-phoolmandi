import axiosServices from "@/lib/axios";

export function getCategoryList(query?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/categories${query ?? ""}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getCategoryId(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/categories/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteCategory(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .delete(`/api/categories/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export function  createCategory(values: unknown): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .post("/api/categories", values)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export function updateCategory(id: number, values: unknown): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .put(`/api/categories/${id}`, values)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}