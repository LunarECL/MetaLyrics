const input = document.querySelector("input");
const preview = document.querySelector(".file_list");

input.addEventListener("change", async () => {
  const dir = input.files[0].path;
  const result = await window.MetaAPI.setDir(dir);
});
