const post = (url: string, data: any) => fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
},
);

const get = async (url: string) => {
const response = await fetch(url, {
  headers: {
    accept: "application/json",
  },
});

return await response.json();
};

export { post, get };