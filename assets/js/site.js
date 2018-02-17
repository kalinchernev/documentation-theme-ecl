import anchorJS from "anchor-js";

const anchors = new anchorJS();

// add anchor links to headers
anchors.options.placement = "right";
anchors.add("h3");

// Filter UI
const tocElements = document.getElementById("toc").getElementsByTagName("li");

document.getElementById("filter-input").addEventListener("keyup", function(e) {
  let i, element, children;

  // enter key..
  if (e.keyCode === 13) {
    // go to the first displayed item in the toc
    for (i = 0; i < tocElements.length; i++) {
      element = tocElements[i];
      if (!element.classList.contains("ecl-u-d-none")) {
        location.replace(element.firstChild.href);
        return e.preventDefault();
      }
    }
  }

  let match = function() {
    return true;
  };

  const value = this.value.toLowerCase();

  if (!value.match(/^\s*$/)) {
    match = function(element) {
      const html = element.firstChild.innerHTML;
      return html && html.toLowerCase().indexOf(value) !== -1;
    };
  }

  for (i = 0; i < tocElements.length; i++) {
    element = tocElements[i];
    children = Array.from(element.getElementsByTagName("li"));
    if (match(element) || children.some(match)) {
      element.classList.remove("ecl-u-d-none");
    } else {
      element.classList.add("ecl-u-d-none");
    }
  }
});

const items = document.getElementsByClassName("toggle-sibling");
for (let j = 0; j < items.length; j++) {
  items[j].addEventListener("click", toggleSibling);
}

function toggleSibling() {
  const stepSibling = this.parentNode.getElementsByClassName(
    "toggle-target"
  )[0];
  const icon = this.getElementsByClassName("icon")[0];
  const klass = "ecl-u-d-none";
  if (stepSibling.classList.contains(klass)) {
    stepSibling.classList.remove(klass);
    icon.innerHTML = "▾";
  } else {
    stepSibling.classList.add(klass);
    icon.innerHTML = "▸";
  }
}

function showHashTarget(targetId) {
  if (targetId) {
    const hashTarget = document.getElementById(targetId);
    // new target is hidden
    if (
      hashTarget &&
      hashTarget.offsetHeight === 0 &&
      hashTarget.parentNode.parentNode.classList.contains("ecl-u-d-none")
    ) {
      hashTarget.parentNode.parentNode.classList.remove("ecl-u-d-none");
    }
  }
}

function scrollIntoView(targetId) {
  // Only scroll to element if we don't have a stored scroll position.
  if (targetId && !history.state) {
    const hashTarget = document.getElementById(targetId);
    if (hashTarget) {
      hashTarget.scrollIntoView();
    }
  }
}

function gotoCurrentTarget() {
  showHashTarget(location.hash.substring(1));
  scrollIntoView(location.hash.substring(1));
}

window.addEventListener("hashchange", gotoCurrentTarget);
gotoCurrentTarget();

const toclinks = document.getElementsByClassName("pre-open");
for (let k = 0; k < toclinks.length; k++) {
  toclinks[k].addEventListener("mousedown", preOpen, false);
}

function preOpen() {
  showHashTarget(this.hash.substring(1));
}
