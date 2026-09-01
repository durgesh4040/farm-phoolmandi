import axiosServices from "@/lib/axios";

export function getFlowersList(query?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/products${query ?? ""}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getFlowerById(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .get(`/api/products/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteFlower(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .delete(`/api/products/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export function createFlower(values: unknown): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .post("/api/products", values)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export function updateFlower(id: number, values: unknown): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosServices
      .put(`/api/products/${id}`, values)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}