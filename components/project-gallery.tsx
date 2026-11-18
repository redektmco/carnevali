"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo, Piece, Project } from "@/lib/content";
import { Chevron } from "./marks";

type Album = { title: string; subtitle?: string; photos: Photo[] };

/** Visualizador de fotos: <dialog> nativo (foco preso e Esc já vêm do navegador). */
function useViewer() {
  const ref = useRef<HTMLDialogElement>(null);
  const [album, setAlbum] = useState<Album | null>(null);
  const [index, setIndex] = useState(0);

  const open = useCallback((next: Album, start = 0) => {
    setAlbum(next);
    setIndex(start);
    requestAnimationFrame(() => {
      const d = ref.current;
      if (d && !d.open) d.showModal();
      document.documentElement.classList.add("modal-open");
    });
  }, []);

  const close = useCallback(() => {
    const d = ref.current;
    if (!d || !d.open) return;
    d.classList.add("is-closing");
    window.setTimeout(() => {
      d.classList.remove("is-closing");
      d.close();
    }, 180);
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => document.documentElement.classList.remove("modal-open");
    const onCancel = (e: Event) => {
      e.preventDefault();
      close();
    };
    d.addEventListener("close", onClose);
    d.addEventListener("cancel", onCancel);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("cancel", onCancel);
    };
  }, [close]);

  return { ref, album, index, setIndex, open, close };
}

function Viewer({ v }: { v: ReturnType<typeof useViewer> }) {
  const { album, index, setIndex } = v;
  const total = album?.photos.length ?? 0;
  const go = useCallback(
    (step: number) => setIndex((i) => (total ? (i + step + total) % total : 0)),
    [setIndex, total],
  );
  const photo = album?.photos[index];

  return (
    <dialog
      ref={v.ref}
      className="viewer"
      aria-label={album ? `Fotos: ${album.title}` : "Fotos da obra"}
      onClick={(e) => {
        if (e.target === e.currentTarget) v.close();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      {album && photo && (
        <div className="viewer__panel">
          <header className="viewer__head">
            <div>
              <p className="viewer__title">{album.title}</p>
              {album.subtitle && <p className="viewer__sub">{album.subtitle}</p>}
            </div>
            <button type="button" className="viewer__close" onClick={v.close} aria-label="Fechar fotos">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </header>

          <figure className="viewer__stage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={photo.src} src={photo.src} alt={photo.alt} />
            <figcaption>
              <span className="viewer__count" aria-live="polite">
                {index + 1} / {total}
              </span>
              <span>{photo.alt}</span>
            </figcaption>
          </figure>

          {total > 1 && (
            <>
              <button type="button" className="viewer__nav viewer__nav--prev" onClick={() => go(-1)} aria-label="Foto anterior">
                <Chevron />
              </button>
              <button type="button" className="viewer__nav viewer__nav--next" onClick={() => go(1)} aria-label="Próxima foto">
                <Chevron />
              </button>
              <ul className="viewer__thumbs">
                {album.photos.map((p, i) => (
                  <li key={p.src}>
                    <button
                      type="button"
                      aria-label={`Ver foto ${i + 1}`}
                      aria-current={i === index ? "true" : undefined}
                      onClick={() => setIndex(i)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.src} alt="" loading="lazy" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}

export function ProjectGallery({ projects, pieces }: { projects: Project[]; pieces: Piece[] }) {
  const v = useViewer();
  const piecesAlbum: Album = {
    title: "Serviços de caldeiraria",
    photos: pieces.map((p) => ({ src: p.src, alt: `${p.piece} · ${p.client}` })),
  };

  return (
    <>
      <ul className="projects">
        {projects.map((p) => {
          const cover = p.photos[0];
          const more = p.photos.length - 1;
          return (
            <li key={p.name} className={`project${p.wide ? " project--wide" : ""}`}>
              <button
                type="button"
                className="project__open"
                onClick={() => v.open({ title: p.name, subtitle: [p.place, p.service].filter(Boolean).join(" · "), photos: p.photos })}
                aria-label={`Ver ${p.photos.length > 1 ? `${p.photos.length} fotos` : "foto"} de ${p.name}`}
              >
                <span className="project__img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cover.src} alt={cover.alt} loading="lazy" style={{ objectPosition: cover.position }} />
                  {more > 0 && (
                    <span className="project__more" aria-hidden="true">
                      +{more} {more === 1 ? "foto" : "fotos"}
                    </span>
                  )}
                </span>
                <span className="project__cap">
                  <strong>{p.name}</strong>
                  {p.place && <span className="project__place">{p.place}</span>}
                  <span className="project__service">{p.service}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="pieces">
        <div className="pieces__head">
          <h3 className="pieces__title">Serviços de caldeiraria</h3>
          <p className="pieces__note">Peças fabricadas e o cliente de cada uma.</p>
        </div>
        <ul className="pieces__grid">
          {pieces.map((p, i) => (
            <li key={p.src}>
              <button
                type="button"
                className="piece"
                onClick={() => v.open(piecesAlbum, i)}
                aria-label={`Ver foto: ${p.piece}, ${p.client}`}
              >
                <span className="piece__img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} loading="lazy" />
                </span>
                <span className="piece__cap">
                  <Chevron />
                  <span>
                    {p.piece} <strong>{p.client}</strong>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Viewer v={v} />
    </>
  );
}
