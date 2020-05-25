window.addEventListener('DOMContentLoaded', async () => {
  if (!window.EB) return

  const win = window.EB.BrowserWindow.getFocusedWindow();

  $('.sqlite3').addEventListener('click', async (e) => {
    switch (e.target.className) {

      case 'create-btn': {
        const [name, age, model] = [$('.create-name'), $('.create-age'), $('.create-model')].map(x => x.value);
        const person = await EB.DB.create({
          name,
          age,
          model
        })
        $('.block').innerHTML = `${JSON.stringify(person,null,4)}`

        console.log(`${JSON.stringify(person,null,4)} created!`);
        break;
      }

      case 'remove-btn': {
        const [name, age, model] = [$('.create-name'), $('.create-age'), $('.create-model')].map(x => x.value);
        const prop = name ? 'name' : age ? 'age' : 'model'
        const count = await EB.DB.count({
          [prop]: name || age || model
        })
        $('.block').innerHTML = `共 removed ${count} 个`
        console.log(`${count} removed!`);
        break;
      }

      case 'clear-btn': {
        const count = await EB.DB.clear()
        console.log(`cleared ${count} 个`);
        break;
      }

      case 'update-btn': {
        const [name, age, model] = [$('.create-name'), $('.create-age'), $('.create-model')].map(x => x.value);
        const rowsAffected = await EB.DB.update({
          name
        }, {
          age,
          model
        })
        $('.block').innerHTML = `${JSON.stringify(rowsAffected,null,4)}`
        console.log(`rowsAffected ${JSON.stringify(rowsAffected,null,4)}`);
        break;
      }

      case 'find-btn': {
        const [name, age, model] = [$('.create-name'), $('.create-age'), $('.create-model')].map(x => x.value);
        const prop = name ? 'name' : age ? 'age' : 'model'
        const person = await EB.DB.findOne({
          [prop]: name || age || model
        })

        $('.block').innerHTML = `${JSON.stringify(person,null,4)}`
        console.log(`${JSON.stringify(person,null,4)} found!`);
        break;
      }

      case 'find': {
        const [name, age, model] = [$('.create-name'), $('.create-age'), $('.create-model')].map(x => x.value);
        const prop = name ? 'name' : age ? 'age' : 'model'
        const persons = await EB.DB.find()
        $('.block').innerHTML = `${JSON.stringify(persons,null,4)}`
        console.log(`${JSON.stringify(persons,null,4)}`);
        break;
      }

      case 'count-btn': {
        const [name, age, model] = [$('.create-name'), $('.create-age'), $('.create-model')].map(x => x.value);
        const prop = name ? 'name' : age ? 'age' : 'model'
        const props = age ? ['age', '>', age] : name || age || model ? {
          [prop]: name || age || model
        } : undefined
        // console.log(props);

        const count = await EB.DB.count(props)
        $('.block').innerHTML = `${JSON.stringify(props)} 共 ${count} 个`
        console.log(`${count} found!`);
        break;
      }
      default: {
        break;
      }
    }
  })


  $('.open-url') && $('.open-url').addEventListener('click', (e) => {
    const link = $('.open-url').getAttribute('href');
    console.log(link);

    EB.ipcRenderer.send('open-url', link)
  })



  // Minimize task
  document.getElementById("min-btn").addEventListener("click", (e) => {
    win.minimize();
  });

  // Maximize window
  document.getElementById("max-btn").addEventListener("click", (e) => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  // Close app
  document.getElementById("close-btn").addEventListener("click", (e) => {
    win.close();
  });
})