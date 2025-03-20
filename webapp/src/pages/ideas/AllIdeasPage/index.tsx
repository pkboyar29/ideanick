import { Link } from 'react-router-dom';
import { getViewIdeaRoute } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';
import css from './index.module.scss';
import InfiniteScroll from 'react-infinite-scroller';

import { Segment } from '../../../components/Segment';
import { Alert } from '../../../components/Alert';
import { Loader } from '../../../components/Loader';
import { layoutContentRef } from '../../../components/Layout';

export const AllIdeasPage = () => {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = trpc.getIdeas.useInfiniteQuery(
    {
      limit: 2,
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    }
  );

  return (
    <Segment title="All ideas">
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={css.ideas}>
          <InfiniteScroll
            threshold={250}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                console.log('hello');
                fetchNextPage();
              }
            }}
            hasMore={hasNextPage}
            loader={
              <div className={css.more} key="loader">
                <Loader type="section" />
              </div>
            }
            getScrollParent={() => layoutContentRef.current}
            useWindow={
              (layoutContentRef.current &&
                getComputedStyle(layoutContentRef.current).overflow) !== 'auto'
            }
          >
            {data.pages
              .flatMap((page) => page.ideas)
              .map((idea) => (
                <div className={css.idea} key={idea.nick}>
                  <Segment
                    size={2}
                    title={
                      <Link
                        className={css.ideaLink}
                        to={getViewIdeaRoute({ ideaNick: idea.nick })}
                      >
                        {idea.name}
                      </Link>
                    }
                    description={idea.description}
                  />
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  );
};
