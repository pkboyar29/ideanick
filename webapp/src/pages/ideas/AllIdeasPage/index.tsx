import { Link } from 'react-router-dom';
import { getViewIdeaRoute } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';
import css from './index.module.scss';
import InfiniteScroll from 'react-infinite-scroller';
import { useDebounce } from 'usehooks-ts';
import { useForm } from '../../../lib/form';
import { zGetIdeasTrpcInput } from '@ideanick/backend/src/router/ideas/getIdeas/input';
import { Input } from '../../../components/Input';

import { Segment } from '../../../components/Segment';
import { Alert } from '../../../components/Alert';
import { Loader } from '../../../components/Loader';
import { layoutContentRef } from '../../../components/Layout';
import { withPageWrapper } from '../../../lib/pageWrapper';

export const AllIdeasPage = withPageWrapper({
  title: 'Ideanick',
  isTileExact: true,
})(() => {
  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetIdeasTrpcInput.pick({ search: true }),
  });
  const search = useDebounce(formik.values.search, 300);

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
      search,
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    }
  );

  return (
    <Segment title="All ideas">
      <div className={css.filter}>
        <Input maxWidth={'100%'} label="Search" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data.pages[0].ideas.length ? (
        <Alert color="brown">Nothing found by search</Alert>
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
                  >
                    Likes: {idea.likesCount}
                  </Segment>
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  );
});
