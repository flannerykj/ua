export function timeSince(date) {

  var datetime = new Date(performance.date_time)
  var current = Date.now();

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export function makeUrl(base, name, id) {
  var slug = slugify(name, id).toLowerCase()
  return base+slug;
}

export function slugify(name, id) {
  var noSpaces = name.replace(' ', '-');
  var slug = noSpaces+'-'+id+'/'
  return slug
}

export function reverseSlugify(slug) {
  var id = slug.substring(slug.lastIndexOf("-") + 1);
  var name = slug.replace(id, '')
  return {name: name, id: id}
}

export function instanceCopy(obj) {
  // copy the object by the constructor
  const copy = new obj.constructor()
  const keys = Object.keys(obj)
  keys.forEach(key => {
    copy[key] = obj[key]
  })
  return copy
}
