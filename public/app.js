document.addEventListener('click', ({target}) => {
  if (target.dataset.type === 'remove') {
    const id = target.dataset.id

    remove(id).then(() => {
      target.closest('li').remove()
    })
  }

  if (target.dataset.type === 'open') {
    const id = target.dataset.id

    const title = prompt('Изменить заголовок на:',
      target.previousElementSibling.outerText
    )

    if (!title) return false

    target.previousElementSibling.textContent = title

    update(id, title)
  }
})

async function remove(id) {
  await fetch(`/${ id }`, {
    method: 'DELETE'
  })
}

async function update(id, value) {
  return fetch(`/${ id }`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({title: value, id}),
  })
}
