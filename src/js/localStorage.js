const load = key => {
  try {
    let state = localStorage.getItem(key);
    return (state = JSON.parse(state) || undefined);
  } catch (error) {
    console.error('Get state error:', error);
  }
};

const save = (key, value) => {
  try {
    const state = JSON.stringify(value);
    localStorage.setItem(key, state);
  } catch (error) {
    console.error('Set state error:', error);
  }
};

const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Remove state error:', error);
  }
};

export { load, save, remove };
