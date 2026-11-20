(function () {
  "use strict";
  var D = window.SITE;
  var $ = function (id) { return document.getElementById(id); };
  if (!D) {
    if ($("content")) $("content").textContent = "data.js did not load. Keep data.js in the same folder as index.html.";
    return;
  }

  var list = function (a) { return Array.isArray(a) ? a.filter(Boolean) : []; };
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  var langs = ["en", "zh", "es", "fr"];
  var lang = store.get("lang");
  if (langs.indexOf(lang) < 0) lang = "en";
  var I18N_ALL = D.i18n || {};
  var T = I18N_ALL[lang] || I18N_ALL.en || {};

  function fmt(tpl, map) {
    var out = String(tpl || "");
    Object.keys(map || {}).forEach(function (k) {
      out = out.replace(new RegExp("\\{" + k + "\\}", "g"), String(map[k]));
    });
    return out;
  }

  function safeUrl(u) {
    u = String(u || "").trim();
    return /^(https?:|mailto:)/i.test(u) || /^[\\w./#-][^:]*$/.test(u) ? u : "";
  }
  function add(parent, c) {
    if (!parent || c === null || c === undefined || c === false || c === "") return;
    if (Array.isArray(c)) c.forEach(function (x) { add(parent, x); });
    else parent.appendChild(typeof c === "object" ? c : document.createTextNode(String(c)));
  }
  function h(tag, attrs) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    });
    for (var i = 2; i < arguments.length; i++) add(e, arguments[i]);
    return e;
  }
  function link(label, url, cls) {
    var u = safeUrl(url);
    var ext = /^https?:/i.test(u);
    var attrs = { href: u };
    if (cls) attrs["class"] = cls;
    if (ext) {
      attrs.target = "_blank";
      attrs.rel = "noopener noreferrer";
    }
    return u && label ? h("a", attrs, label) : null;
  }

  function showFeedback(text) {
    var fb = $("formFeedback");
    if (!fb) return;
    fb.textContent = text;
    fb.hidden = false;
  }

  function openDirectEmail(subject, body) {
    var modal = $("emailModal");
    if (!modal) return;
    if ($("modalTitle")) $("modalTitle").textContent = T.modalTitle || "Send Email Inquiry";
    if ($("modalNote")) $("modalNote").textContent = T.modalNote || "";
    if ($("submitEmailBtn")) $("submitEmailBtn").textContent = T.sendSubmitBtn || "Send Email";
    if ($("copyDraftBtn")) $("copyDraftBtn").textContent = T.copyDraftBtn || "Copy Message";
    if ($("cancelModalBtn")) $("cancelModalBtn").textContent = T.cancelBtn || "Cancel";
    if ($("senderSubject")) $("senderSubject").value = subject || "";
    if ($("senderMessage")) $("senderMessage").value = body || "";
    if ($("formFeedback")) {
      $("formFeedback").hidden = true;
      $("formFeedback").textContent = "";
    }
    modal.hidden = false;
    if ($("senderName")) $("senderName").focus();
  }

  function closeDirectEmail() {
    var modal = $("emailModal");
    if (modal) modal.hidden = true;
  }

  function buildFormattedInquiry() {
    var senderN = ($("senderName") && $("senderName").value.trim()) || "";
    var senderE = ($("senderEmail") && $("senderEmail").value.trim()) || "";
    var subj = ($("senderSubject") && $("senderSubject").value.trim()) || "Research Inquiry";
    var msg = ($("senderMessage") && $("senderMessage").value.trim()) || "";
    return {
      senderName: senderN,
      senderEmail: senderE,
      subject: subj,
      message: msg,
      body: "From: " + senderN + (senderE ? " (" + senderE + ")" : "") + "\\n\\n" + msg
    };
  }

  function directEmailBtn(label, subject, body, cls, iconOnly) {
    var btn = h("button", {
      type: "button",
      "class": cls || "btn",
      "aria-label": T.sendDirectBtn || "Send Email Inquiry",
      onclick: function () { openDirectEmail(subject, body); }
    });
    var mailSvg = h("span", { "class": "ico", "aria-hidden": "true" });
    mailSvg.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18v14H3zM3 6l9 7 9-7"/></svg>';
    btn.appendChild(mailSvg);
    if (!iconOnly) {
      btn.appendChild(document.createTextNode(label || T.directEmailBtn || "Direct Email"));
    }
    return btn;
  }

  if ($("closeModalBtn")) $("closeModalBtn").addEventListener("click", closeDirectEmail);
  if ($("cancelModalBtn")) $("cancelModalBtn").addEventListener("click", closeDirectEmail);
  if ($("emailModal")) {
    $("emailModal").addEventListener("click", function (e) {
      if (e.target === $("emailModal")) closeDirectEmail();
    });
  }
  if ($("copyDraftBtn")) {
    $("copyDraftBtn").addEventListener("click", function () {
      var info = buildFormattedInquiry();
      var text = "Subject: " + info.subject + "\\n\\n" + info.body;
      var btn = $("copyDraftBtn");
      var orig = btn.textContent;
      function markCopied() {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = orig; }, 1600);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(markCopied, function () { showFeedback(text); });
      } else {
        showFeedback(text);
      }
    });
  }
  if ($("directEmailForm")) {
    $("directEmailForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var info = buildFormattedInquiry();
      if (!info.senderName || !info.senderEmail || !info.message) return;

      var endpoint = D.formspreeEndpoint && String(D.formspreeEndpoint).trim();
      if (endpoint && /^https:\\/\\/formspree\\.io\\/f\\/[\\w-]+/i.test(endpoint)) {
        var submitBtn = $("submitEmailBtn");
        if (submitBtn) submitBtn.disabled = true;
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            name: info.senderName,
            email: info.senderEmail,
            subject: info.subject,
            message: info.message
          })
        }).then(function (res) {
          if (submitBtn) submitBtn.disabled = false;
          if (res.ok) {
            showFeedback(T.submittedNotice || "Thank you. Your inquiry has been submitted.");
            $("directEmailForm").reset();
          } else {
            showFeedback("Could not send directly. Please use Copy Message and try again.");
          }
        }).catch(function () {
          if (submitBtn) submitBtn.disabled = false;
          showFeedback("Network issue while sending. Please use Copy Message and try again.");
        });
        return;
      }

      if (D.email) {
        window.location.href = "mailto:" + D.email + "?subject=" + encodeURIComponent(info.subject) + "&body=" + encodeURIComponent(info.body);
        showFeedback(T.sentNotice || "Email draft prepared in your mail client.");
      }
    });
  }

  var chips = function (a) { return list(a).length ? h("ul", { "class": "chips" }, list(a).map(function (t) { return h("li", { "class": "chip" }, t); })) : null; };
  var bullets = function (title, a) { return list(a).length ? h("div", null, h("h4", null, title), h("ul", null, list(a).map(function (t) { return h("li", null, t); }))) : null; };
  var links = function (a) {
    var l = list(a).map(function (x) { return link(x.label, x.url); }).filter(Boolean);
    return l.length ? h("p", { "class": "links" }, l) : null;
  };
  var fmtWhen = function (s) {
    var m = /^(\\d{4})-(\\d{2})$/.exec(String(s || ""));
    return m && MONTHS[+m[2] - 1] ? MONTHS[+m[2] - 1] + " " + m[1] : String(s || "");
  };

  function copy(text, btn) {
    var label = btn.textContent;
    function done() { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = label; }, 1600); }
    function fallback() {
      var ta = h("textarea", { readonly: "", style: "position:fixed;opacity:0" });
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (e) {}
      ta.remove();
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
  }
  var copyBtn = function (label, text) {
    var b = h("button", { type: "button", "class": "ghost" }, label);
    b.addEventListener("click", function () { copy(text, b); });
    return b;
  };

  var flagged = 0;
  function sampleBadge(item) {
    var hit = item.example === true;
    (function scan(v) {
      if (hit) return;
      if (typeof v === "string") hit = /\\[[^\\]]+\\]/.test(v);
      else if (v && typeof v === "object") Object.keys(v).forEach(function (k) { scan(v[k]); });
    })(item);
    if (hit) flagged++;
    return hit ? h("span", { "class": "badge sample" }, "Sample") : null;
  }
  function row(when, body, item) {
    return h("div", { "class": "row" }, h("div", { "class": "when" }, fmtWhen(when)), h("div", null, body, sampleBadge(item || {})));
  }
  var rows = function (a) { return list(a).map(function (e) { return row(e.when, e.text, e); }); };

  var sceneUrl = safeUrl(D.sceneImage);
  var sceneImg = $("heroSceneImg");
  if (sceneImg) {
    if (sceneUrl) {
      sceneImg.src = sceneUrl;
      sceneImg.onerror = function () {
        this.style.display = "none";
      };
    } else {
      sceneImg.style.display = "none";
    }
  }

  var parts = String(D.name || "").split(/\\s+/);
  var first = parts[0] || "";
  var last = parts[parts.length - 1] || "";
  var initials = ((first[0] || "") + (parts.length > 1 ? last[0] : "")).toUpperCase();

  document.documentElement.lang = lang;
  document.title = (D.name || "Profile") + (D.title ? " | " + D.title : "");
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute("content", (D.name || "") + ", " + (D.title || "") + ", " + (D.affiliation || "") + ". " + list(D.interests).join(", "));
  }
  document.head.appendChild(h("link", {
    rel: "icon",
    href: "data:image/svg+xml," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#0b7a75"/><text x="32" y="43" font-size="30" text-anchor="middle" fill="#fff" font-family="Georgia,serif" font-weight="bold">' + initials + "</text></svg>"
    )
  }));
  add($("brand"), [h("b", null, initials), D.name]);

  if ($("langSelect")) {
    $("langSelect").value = lang;
    $("langSelect").addEventListener("change", function () {
      store.set("lang", $("langSelect").value);
      window.location.reload();
    });
  }

  var ann = D.announcement || {};
  if (ann.on && ann.text && store.get("ann-dismissed") !== ann.text && $("ann")) {
    var bar = h("div", { "class": "ann", role: "region", "aria-label": "Announcement" },
      ann.text,
      link("Details", ann.url),
      h("button", {
        type: "button",
        "aria-label": "Dismiss announcement",
        onclick: function () { store.set("ann-dismissed", ann.text); bar.remove(); }
      }, "\\u00D7")
    );
    $("ann").appendChild(bar);
  }

  var ICON = {
    cv: "M6 3h9l4 4v14H6zM14 3v5h5M9 13h6M9 17h6",
    code: "M8 8l-5 4 5 4M16 8l5 4-5 4",
    scholar: "M2 9l10-5 10 5-10 5zM6 11v5c3 3 9 3 12 0v-5",
    link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"
  };
  function icon(label) {
    var kind = /cv/i.test(label) ? "cv" : /github/i.test(label) ? "code" : /scholar/i.test(label) ? "scholar" : "link";
    var s = h("span", { "class": "ico", "aria-hidden": "true" });
    s.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + ICON[kind] + '"/></svg>';
    return s;
  }

  var actions = [];
  var cvBtn = link(T.downloadCvBtn || "Download CV", D.cv, "btn solid");
  if (cvBtn) {
    cvBtn.insertBefore(icon("cv"), cvBtn.firstChild);
    actions.push(cvBtn);
  }
  if (D.email) {
    actions.push(directEmailBtn(T.directEmailBtn || "Direct Email", "Direct Inquiry", "", (cvBtn ? "btn" : "btn solid") + " icon-only", true));
  }
  list(D.links).forEach(function (l) {
    var a = link(l.label, l.url, "btn");
    if (a) {
      a.insertBefore(icon(l.label), a.firstChild);
      actions.push(a);
    }
  });

  var st = D.status || {};
  add($("profile"), [
    D.photo && h("img", { "class": "photo", src: D.photo, alt: D.name, onerror: function () { this.remove(); } }),
    h("h1", null, D.name),
    h("p", { "class": "role" }, D.title),
    h("p", { "class": "aff" }, D.affiliation),
    D.tagline && h("p", { "class": "tag" }, D.tagline),
    st.on && st.text && h("div", { "class": "pill" }, h("i"), st.text, st.detail && " \\u00B7 " + st.detail, sampleBadge(st)),
    h("div", { "class": "actions" }, actions)
  ]);

  (function density() {
    if (!$("art")) return;
    var W = 520, H = 220, cs = [{ m: 150, s: 55, a: 150 }, { m: 260, s: 70, a: 185 }, { m: 380, s: 48, a: 130 }];
    var svg = '<svg viewBox="0 0 ' + W + " " + H + '" aria-hidden="true">';
    cs.forEach(function (c, i) {
      var d = "M0 " + H;
      for (var x = 0; x <= W; x += 5) d += " L" + x + " " + (H - c.a * Math.exp(-Math.pow(x - c.m, 2) / (2 * c.s * c.s))).toFixed(1);
      svg += '<path class="c' + i + '" d="' + d + " L" + W + " " + H + 'Z"/>';
    });
    $("art").innerHTML = svg + '<line class="ax" x1="0" y1="' + H + '" x2="' + W + '" y2="' + H + '"/></svg>';
  })();

  function connect() {
    var ps = list(D.paths).filter(function (p) { return p.on !== false; });
    if (!ps.length) return [];
    var tabs = h("div", { "class": "tabs", role: "tablist", "aria-label": T.choosePathPrompt || "Choose what brings you here:" });
    var panel = h("div", { "class": "panel", id: "path-panel", role: "tabpanel", tabindex: "0" });
    var btns = ps.map(function (p, i) {
      return h("button", {
        type: "button",
        role: "tab",
        id: "tab-" + i,
        "aria-controls": "path-panel",
        onclick: function () { select(i); },
        onkeydown: function (e) {
          var d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
          if (d) { e.preventDefault(); select((i + d + ps.length) % ps.length, true); }
        }
      }, h("span", { "class": "t1" }, p.label), h("span", { "class": "t2" }, p.sub));
    });
    function select(i, focus) {
      var p = ps[i];
      btns.forEach(function (b, j) { b.setAttribute("aria-selected", String(i === j)); b.tabIndex = i === j ? 0 : -1; });
      panel.setAttribute("aria-labelledby", "tab-" + i);
      panel.textContent = "";
      var primaryCta = D.email
        ? directEmailBtn(p.cta || T.directEmailBtn || "Send Email Inquiry", p.subject, p.body, "btn solid icon-only", true)
        : null;
      add(panel, [
        h("h3", null, p.headline, sampleBadge(p)),
        p.note && h("p", { "class": "note" }, p.note),
        h("div", { "class": "two" }, bullets(T.whatIOffer || "What I bring", p.offer), bullets(T.whatILookingFor || "What I am looking for", p.seeking)),
        h("p", { "class": "cta" }, primaryCta, link(T.downloadCvBtn || "Download CV", D.cv, "btn"))
      ]);
      if (focus) btns[i].focus();
    }
    add(tabs, btns);
    select(0);
    return [h("p", null, T.choosePathPrompt || "Choose what brings you here:"), tabs, panel];
  }

  function about() {
    return list(D.bio).map(function (p) { return h("p", null, p); })
      .concat(chips(D.interests) ? [h("h3", null, T.researchInterestsHeading || "Research interests"), chips(D.interests)] : []);
  }

  function research() {
    var cards = list(D.research).map(function (r) {
      return h("div", { "class": "card" }, h("h3", null, r.title, sampleBadge(r)), h("p", null, r.text), chips(r.tags), links(r.links));
    });
    return cards.length ? [h("div", { "class": "grid" }, cards)] : [];
  }

  function publications() {
    var yr = function (p) { return +p.year || 9999; };
    var pubs = list(D.publications).slice().sort(function (a, b) { return yr(b) - yr(a); });
    if (!pubs.length) return [];
    var me = [last + ", " + first[0] + ".", first[0] + ". " + last, last + ", " + first, D.name].filter(function (n) { return n.length > 4; });
    var meRe = new RegExp("(" + me.map(function (n) { return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")", "g");
    var allLabel = T.allStatusLabel || "All";
    var state = { status: allLabel, q: "" };
    var box = h("div");
    var count = h("p", { "class": "count", "aria-live": "polite" });
    var statuses = [allLabel].concat(pubs.map(function (p) { return p.status; }).filter(function (s, i, a) { return s && a.indexOf(s) === i; }));

    function render() {
      var shown = 0, q = state.q.toLowerCase();
      box.textContent = "";
      pubs.forEach(function (p) {
        if ((state.status !== allLabel && p.status !== state.status) || (q && [p.authors, p.title, p.venue, p.year, p.status].join(" ").toLowerCase().indexOf(q) < 0)) return;
        shown++;
        var ls = links(p.links);
        var bib = p.bibtex && copyBtn("Copy BibTeX", p.bibtex);
        box.appendChild(row(p.year, [
          h("div", { "class": "pub-title" }, p.title),
          h("div", null, String(p.authors || "").split(meRe).map(function (s) { return me.indexOf(s) > -1 ? h("strong", null, s) : s; })),
          p.venue && h("div", { "class": "note" }, h("em", null, p.venue)),
          p.status && h("span", { "class": "badge" + (/review|preprint/i.test(p.status) ? " warn" : "") }, p.status),
          ls,
          bib && h("span", { "class": "links" }, bib)
        ], p));
      });
      count.textContent = shown
        ? fmt(T.shownCountTemplate || "{shown} of {total} shown", { shown: shown, total: pubs.length })
        : (T.noPubsMatch || "No publications match.");
    }

    var group = h("div", { "class": "chips", role: "group", "aria-label": T.filterByStatusLabel || "Filter by status" }, statuses.map(function (s) {
      return h("button", {
        type: "button",
        "class": "chip",
        "aria-pressed": String(s === allLabel),
        onclick: function () {
          state.status = s;
          Array.prototype.forEach.call(group.children, function (b) { b.setAttribute("aria-pressed", String(b.textContent === s)); });
          render();
        }
      }, s);
    }));
    var search = h("input", {
      type: "search",
      placeholder: T.searchPubsPlaceholder || "Search publications",
      "aria-label": T.searchPubsPlaceholder || "Search publications",
      oninput: function () { state.q = search.value; render(); }
    });
    render();
    return [pubs.length > 3 && h("div", { "class": "tools" }, group, search), count, box];
  }

  function software() {
    var cards = list(D.software).map(function (s) {
      return h("div", { "class": "card" }, h("h3", null, link(s.name, s.url) || s.name), h("p", null, s.text), chips(s.tags));
    });
    return cards.length ? [h("div", { "class": "grid" }, cards)] : [];
  }

  function news() {
    var items = list(D.news).slice().sort(function (a, b) { return String(b.when).localeCompare(String(a.when)); });
    if (!items.length) return [];
    var box = h("div"), open = false;
    var more = h("button", { type: "button", id: "more", "class": "ghost", onclick: function () { open = !open; render(); } });
    function render() {
      box.textContent = "";
      add(box, rows(items.slice(0, open ? items.length : 5)));
      more.textContent = open ? (T.showFewer || "Show fewer") : fmt(T.showAllTemplate || "Show all {total}", { total: items.length });
      more.hidden = items.length <= 5;
    }
    render();
    return [box, more];
  }

  function now() {
    var n = D.now || {}, items = list(n.items);
    if (n.on === false || !items.length) return [];
    return [
      h("p", { "class": "note" }, n.updated ? (T.updatedPrefix || "Updated ") + fmtWhen(n.updated) : "", sampleBadge(n)),
      h("ul", null, items.map(function (t) { return h("li", null, t); }))
    ];
  }

  function custom(c) {
    return function () {
      var items = list(c.items).map(function (it) {
        return row(it.when, [h("div", { "class": "pub-title" }, link(it.title, it.url) || it.title), it.text && h("div", null, it.text), chips(it.tags)], it);
      });
      return items.length ? [c.intro && h("p", null, c.intro)].concat(items) : [];
    };
  }

  function documents() {
    return list(D.documents).map(function (d) {
      var act = safeUrl(d.url)
        ? link(T.openLabel || "Open", d.url, "btn")
        : directEmailBtn(T.requestByEmailLabel || "Direct email inquiry", "Request: " + d.label, "", "btn icon-only", true);
      return h("div", { "class": "row doc" }, h("div", null, h("strong", null, d.label), d.note && h("div", { "class": "note" }, d.note), sampleBadge(d)), act);
    });
  }

  function cv() {
    var out = [D.cv && h("p", null, link(T.downloadFullCv || "Download full CV (PDF)", D.cv, "btn solid"))];
    list(D.cvSections).forEach(function (g) { if (list(g.items).length) out.push(h("h3", null, g.title), rows(g.items)); });
    if (list(D.skills).length) out.push(h("h3", null, T.skillsHeading || "Skills"), chips(D.skills));
    return out;
  }

  function referees() {
    var rs = list(D.referees).map(function (r) {
      return h("div", { "class": "row doc" }, h("div", null, h("strong", null, r.name), r.affiliation && h("div", { "class": "note" }, r.affiliation)), r.email && link(r.email, "mailto:" + r.email));
    });
    return rs.length ? [h("p", { "class": "note" }, T.refereesNote || "Listed with their permission.")].concat(rs) : [];
  }

  function contact() {
    var out = [];
    if (D.contactNote) out.push(h("p", null, D.contactNote));

    var cards = [];
    if (D.email) {
      cards.push(h("div", { "class": "contact-box" },
        h("h3", null, T.contactChannelLabel || "Direct Message"),
        h("p", null, T.contactChannelDesc || "Email address is hidden from public view."),
        directEmailBtn(T.sendDirectBtn || "Send Email Inquiry", "Direct Contact", "", "btn solid icon-only", true)
      ));
    }
    var validLinks = list(D.links).filter(function (l) { return safeUrl(l.url); });
    if (validLinks.length) {
      cards.push(h("div", { "class": "contact-box" },
        h("h3", null, T.socialProfilesLabel || "Academic & Social Profiles"),
        h("p", null, "ORCID, Google Scholar, GitHub & social channels."),
        h("div", { "class": "actions" }, validLinks.map(function (l) {
          return link(l.label, l.url, "btn");
        }))
      ));
    }
    if (cards.length) out.push(h("div", { "class": "contact-cards" }, cards));

    if (D.location) {
      out.push(h("div", { "class": "crow" }, h("span", { "class": "ck" }, "Location"), D.location));
    }
    return out;
  }

  var secNames = T.sections || {};
  var plan = [
    ["connect", secNames.connect || "Work with me", connect],
    ["about", secNames.about || "About", about],
    ["research", secNames.research || "Research", research],
    ["publications", secNames.publications || "Publications", publications],
    ["software", secNames.software || "Software", software],
    ["news", secNames.news || "News", news],
    ["awards", secNames.awards || "Honours", function () { return rows(D.awards); }],
    ["talks", secNames.talks || "Talks", function () { return rows(D.talks); }],
    ["documents", secNames.documents || "Documents", documents],
    ["cv", secNames.cv || "Background", cv],
    ["referees", secNames.referees || "Referees", referees],
    ["contact", secNames.contact || "Contact", contact]
  ];
  plan.splice(2, 0, ["now", secNames.now || "Now", now]);
  list(D.custom).filter(function (c) { return c.on !== false && c.title; }).forEach(function (c) {
    plan.splice(plan.length - 4, 0, ["c-" + String(c.id || c.title).replace(/[^\\w-]/g, "-"), c.title, custom(c)]);
  });

  var observed = [];
  plan.forEach(function (p) {
    var body = [].concat(p[2]()).filter(function (x) { return x && !(Array.isArray(x) && !x.length); });
    if (!body.length) return;
    var sec = h("section", { id: p[0], "aria-labelledby": p[0] + "-h" }, h("h2", { id: p[0] + "-h" }, p[1]), body);
    if ($("content")) $("content").appendChild(sec);
    if ($("toc")) $("toc").appendChild(h("a", { href: "#" + p[0] }, p[1]));
    observed.push(sec);
  });

  var root = document.documentElement;
  if ("IntersectionObserver" in window && $("toc")) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          Array.prototype.forEach.call($("toc").children, function (a) {
            a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id);
          });
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    observed.forEach(function (s) { io.observe(s); });
  }

  var size = +store.get("size") || 17;
  function setSize(n) {
    size = Math.max(15, Math.min(22, n));
    root.style.fontSize = size + "px";
    store.set("size", size);
    if ($("fdn")) $("fdn").disabled = size <= 15;
    if ($("fup")) $("fup").disabled = size >= 22;
  }
  if ($("fdn")) $("fdn").addEventListener("click", function () { setSize(size - 1); });
  if ($("fup")) $("fup").addEventListener("click", function () { setSize(size + 1); });
  setSize(size);

  var themes = ["light", "paper", "dark"];
  var names = { light: "Light", paper: "Paper", dark: "Dark" };
  function currentTheme() {
    return root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function showTheme() {
    if (!$("theme")) return;
    $("theme").textContent = names[currentTheme()];
    $("theme").setAttribute("aria-label", "Colour theme: " + names[currentTheme()] + ". Click to change.");
  }
  if (themes.indexOf(store.get("theme")) > -1) root.dataset.theme = store.get("theme");
  if ($("theme")) {
    $("theme").addEventListener("click", function () {
      root.dataset.theme = themes[(themes.indexOf(currentTheme()) + 1) % themes.length];
      store.set("theme", root.dataset.theme);
      showTheme();
    });
  }
  showTheme();

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var max = root.scrollHeight - innerHeight, y = window.scrollY;
      if ($("progress")) $("progress").style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
      if ($("up")) $("up").hidden = y < 700;
      ticking = false;
    });
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if ($("up")) $("up").addEventListener("click", function () { scrollTo({ top: 0 }); });

  if ($("foot")) {
    $("foot").textContent = "\u00A9 " + new Date().getFullYear() + " " + D.name + (D.updated ? ". Last updated " + fmtWhen(D.updated.slice(0, 7)) + "." : "");
  }
  if (flagged) console.warn("[site] " + flagged + " sample item(s) still on the page. Edit data.js to replace them.");
})();