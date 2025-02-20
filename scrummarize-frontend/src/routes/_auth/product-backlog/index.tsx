import { createFileRoute, useNavigate } from '@tanstack/react-router';
import '../../../ProductBacklog.css';
import TaskCard from '../../../TaskCard.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faArrowsUpDownLeftRight,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from '@tanstack/react-router';
import { Task } from '../../../lib/types.ts';
import { useEffect, useState } from 'react';
import { FilterButton, SortButton } from '../../../Sort&Filter.tsx';

export const Route = createFileRoute('/_auth/product-backlog/')({
  component: ProductBacklog,
  loader: fetchTasks,
});

async function fetchTasks() {
  const res = await fetch('http://localhost:3000/api/product-backlog/', {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch tasks for Product Backlog');
  }
  return res.json();
}

function ProductBacklog() {
  const data: Task[] = Route.useLoaderData();
  const [tasks, setTasks] = useState<Task[]>(data);

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const navigate = useNavigate({ from: '/product-backlog' });
  function viewTask(taskID: string) {
    navigate({
      to: '/product-backlog/task/edit/$taskID',
      params: { taskID },
    });
  }

  const [sortFilter, setSortFilter] = useState<{
    sort: string | undefined;
    filter: string[];
  }>({
    sort: undefined,
    filter: [],
  });

  async function sort(option: string) {
    let queryParams;
    if (sortFilter.filter.length) {
      queryParams = new URLSearchParams({
        filter: sortFilter.filter.join(','),
        sort: option,
      });
    } else {
      queryParams = new URLSearchParams({
        sort: option,
      });
    }

    const res = await fetch(
      `http://localhost:3000/api/product-backlog?${queryParams.toString()}`,
      {
        credentials: 'include',
      }
    );
    if (!res.ok) {
      throw new Error('Failed to sort tasks in Product Backlog');
    }
    setTasks(await res.json());

    setSortFilter({
      ...sortFilter,
      sort: option,
    });
  }

  async function filter(e: React.ChangeEvent<HTMLInputElement>) {
    let options;
    if (e.target.checked) {
      options = [...sortFilter.filter, e.target.value];
    } else {
      options = sortFilter.filter.filter((option) => option !== e.target.value);
    }

    let queryParams;
    if (sortFilter.sort) {
      queryParams = new URLSearchParams({
        filter: options.join(','),
        sort: sortFilter.sort,
      });
    } else {
      queryParams = new URLSearchParams({
        filter: options.join(','),
      });
    }

    const res = await fetch(
      `http://localhost:3000/api/product-backlog?${queryParams.toString()}`,
      {
        credentials: 'include',
      }
    );
    if (!res.ok) {
      throw new Error('Failed to filter tasks in Product Backlog');
    }
    setTasks(await res.json());

    setSortFilter({
      ...sortFilter,
      filter: options,
    });
  }

  return (
    <section className="main__section main__section--gray">
      <div className="product-backlog__first-line">
        <h2>Product Backlog</h2>
        <div className="product-backlog__icons">
          <SortButton sort={sort} />
          <FilterButton filter={filter} options={sortFilter.filter} />
        </div>
      </div>

      <div className="main__section__buttons product-backlog__buttons">
        <Link className="main__section__button" to="/product-backlog/task/new">
          <FontAwesomeIcon icon={faPlus} />
          <p>Add</p>
        </Link>
        <Link className="main__section__button" to="/product-backlog/task/move">
          <FontAwesomeIcon icon={faArrowsUpDownLeftRight} />
          <p>Move</p>
        </Link>
      </div>

      <div className="main__section__list">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.taskID} viewTask={viewTask} />
        ))}
      </div>
    </section>
  );
}
