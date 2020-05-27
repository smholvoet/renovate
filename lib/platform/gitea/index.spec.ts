      commitFiles: gsmCommitFilesToBranch,

    it('should set default base branch', async () => {
      await initFakeRepo();
      await gitea.setBaseBranch();

      expect(gsmSetBaseBranch).toHaveBeenCalledTimes(1);
      expect(gsmSetBaseBranch).toHaveBeenCalledWith(mockRepo.default_branch);
    });

    it('should set custom base branch', async () => {
      await initFakeRepo();
      await gitea.setBaseBranch('devel');

      expect(gsmSetBaseBranch).toHaveBeenCalledTimes(1);
      expect(gsmSetBaseBranch).toHaveBeenCalledWith('devel');
    });
    it('should remove existing comment by topic', async () => {
      expect(helper.deleteComment).toHaveBeenCalledWith(mockRepo.full_name, 3);
    });

    it('should remove existing comment by content', async () => {
      helper.getComments.mockResolvedValueOnce(mockComments);
      await initFakeRepo();
      await gitea.ensureCommentRemoval({ number: 1, content: 'some-body' });

      expect(helper.deleteComment).toHaveBeenCalledTimes(1);
      expect(helper.deleteComment).toHaveBeenCalledWith(mockRepo.full_name, 1);
      await expect(
        gitea.addReviewers(mockPR.number, ['me', 'you'])
      ).resolves.not.toThrow();
  describe('commitFiles', () => {
      await gitea.commitFiles(commitConfig);