import type Note from "@/types/Note";
import NoteCard from "@/components/NoteCard";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import apiService from "@/services/api";
import Paginated from "@/types/Paginated";
import Pagination from "react-bootstrap/Pagination";
import getPageCount from "@/helpers/getPageCount";
import Form from "react-bootstrap/Form";

const limit = 10;

type PageQueryParams = {
  page: number;
  search: string;
};

function Home() {
  const router = useRouter();
  const [, setLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const loadNotes = useCallback(
    async (queryParams: PageQueryParams, abortSignal: AbortSignal) => {
      try {
        const page = queryParams.page ? queryParams.page : 1;
        setLoading(true);

        const params = { offset: (page - 1) * 10, limit, search: "" };
        if (queryParams.search) {
          params.search = queryParams.search || "";
        }

        const res = await apiService.get<Paginated<Note>>("/notes", {
          signal: abortSignal,
          params,
        });

        setTotalCount(res.data.totalCount);
        setNotes(res.data.list);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const abortController = new AbortController();
    const page = router.query.page ? parseInt(router.query.page as string) : 1;
    const search = (router.query.search as string) || "";
    loadNotes({ page, search }, abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [router.query, loadNotes]);

  const handleDelete = async (noteId: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this note?",
    );
    if (!confirm) return;

    const _notes = [...notes];
    const noteIndex = _notes.findIndex((n) => n._id === noteId);
    if (noteIndex === -1) return;

    _notes.splice(noteIndex, 1);
    setNotes(_notes);
    try {
      await apiService.delete<Note>("/notes/" + noteId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleIndex = async (noteId: string) => {
    const _notes = [...notes];
    const noteIndex = _notes.findIndex((n) => n._id === noteId);
    if (noteIndex === -1) return;

    _notes[noteIndex].indexed = !_notes[noteIndex].indexed;
    setNotes(_notes);

    try {
      await apiService.put("/notes/index/" + noteId, {
        indexed: _notes[noteIndex].indexed,
      });
    } catch (err) {}
  };

  const replaceQueryParams = useCallback(
    (params: { [key: string]: string | number | undefined }) => {
      router.replace({
        query: { ...router.query, ...params },
      });
    },
    [router],
  );

  const renderPagination = useCallback(() => {
    const items = [];

    for (let i = 0; i < getPageCount(totalCount, limit); ++i) {
      const pageNum = i + 1;
      items.push(
        <Pagination.Item
          key={`page-btn${pageNum}`}
          onClick={() => {
            replaceQueryParams({ page: pageNum });
          }}
        >
          {pageNum}
        </Pagination.Item>,
      );
    }
    return (
      <div style={{ marginTop: "50px" }}>
        <Pagination>{items}</Pagination>
      </div>
    );
  }, [replaceQueryParams, totalCount]);

  return (
    <div className="container">
      <div className="mb-3 d-flex justify-content-between">
        <h2>Notes</h2>
        <Form.Control
          type="search"
          placeholder="Search"
          aria-label="Search"
          style={{ width: "200px" }}
          onChange={(e) => {
            replaceQueryParams({ search: e.target.value });
          }}
        />
      </div>
      {notes.map((n) => {
        return (
          <div className="mb-3" key={n._id}>
            <NoteCard
              note={n}
              handleDelete={() => handleDelete(n._id)}
              handleIndex={() => handleIndex(n._id)}
            />
          </div>
        );
      })}
      {renderPagination()}
    </div>
  );
}

export default Home;
