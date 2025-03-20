import { TrpcRouterOutput } from '@ideanick/backend/src/router';
import { format } from 'date-fns/format';
import { canBlockIdeas, canEditIdea } from '@ideanick/backend/src/utils/can';
import { useParams } from 'react-router-dom';
import {
  getEditIdeaRoute,
  type ViewIdeaRouteParams,
} from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';
import css from './index.module.scss';
import { FormItems } from '../../../components/FormItems';
import { Alert } from '../../../components/Alert';

import { Segment } from '../../../components/Segment';
import { withPageWrapper } from '../../../lib/pageWrapper';
import { useForm } from '../../../lib/form';
import { Button } from '../../../components/Button';
import { LinkButton } from '../../../components/Button';
import { Icon } from '../../../components/Icon';

const LikeButton = ({
  idea,
}: {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
}) => {
  const trpcUtils = trpc.useUtils();
  const setIdeaLike = trpc.setIdeaLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetIdeaData = trpcUtils.getIdea.getData({ ideaNick: idea.nick });
      if (oldGetIdeaData?.idea) {
        const newGetIdeaData = {
          ...oldGetIdeaData,
          idea: {
            ...oldGetIdeaData.idea,
            isLikedByMe,
            likesCount: oldGetIdeaData.idea.likesCount + (isLikedByMe ? 1 : -1),
          },
        };
        trpcUtils.getIdea.setData({ ideaNick: idea.nick }, newGetIdeaData);
      }
    },
    onSuccess: () => {
      void trpcUtils.getIdea.invalidate({ ideaNick: idea.nick });
    },
  });
  return (
    <button
      className={css.likeButton}
      onClick={() => {
        void setIdeaLike.mutateAsync({
          ideaId: idea.id,
          isLikedByMe: !idea.isLikedByMe,
        });
      }}
    >
      <Icon
        size={32}
        className={css.likeIcon}
        name={idea.isLikedByMe ? 'likeFilled' : 'likeEmpty'}
      />
    </button>
  );
};

const BlockIdea = ({
  idea,
}: {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
}) => {
  const blockIdea = trpc.blockIdea.useMutation();
  const trpcUtils = trpc.useContext();
  const { formik, alertProps, buttonProps } = useForm({
    onSubmit: async () => {
      await blockIdea.mutateAsync({ ideaId: idea.id });
      await trpcUtils.getIdea.refetch({ ideaNick: idea.nick });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Alert {...alertProps} />
        <Button color="red" {...buttonProps}>
          Block Idea
        </Button>
      </FormItems>
    </form>
  );
};

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = useParams() as ViewIdeaRouteParams;
    return trpc.getIdea.useQuery({
      ideaNick,
    });
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    idea: checkExists(queryResult.data.idea, 'Idea not found'),
    me: ctx.me,
  }),
  title: ({ idea }) => idea.name,
  showLoaderOnFetching: false,
})(({ idea, me }) => (
  <Segment title={idea.name} description={idea.description}>
    <div className={css.createdAt}>
      Created At: {format(idea.createdAt, 'yyyy-MM-dd')}
    </div>
    <div className={css.author}>
      Author: {idea.author.nick}
      {idea.author.name ? ` (${idea.author.name})` : ''}
    </div>
    <div className={css.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
    <div className={css.likes}>
      Likes: {idea.likesCount}
      {me && (
        <>
          <br />
          <LikeButton idea={idea} />
        </>
      )}
    </div>
    {canEditIdea(me, idea) && (
      <div className={css.editButton}>
        <LinkButton to={getEditIdeaRoute({ ideaNick: idea.nick })}>
          Edit Idea
        </LinkButton>
      </div>
    )}
    {canBlockIdeas(me) && (
      <div className={css.blockIdea}>
        <BlockIdea idea={idea} />
      </div>
    )}
  </Segment>
));
