import { initialState, appReducer } from '../../src/website/appReducer';

describe('appReducer', () => {
  describe('intial state', () => {
    it('should display input page', () => {
      expect(initialState.page).toBe('INPUT_WORKSPACE');
    });
  });

  describe('when a workspace creation operation starts', () => {
    const state = appReducer(initialState, {
      type: 'WORKSPACE_CREATION_REQUESTED'
    });

    it('should switch to the progress page', () => {
      expect(state.page).toBe('WAITING_FOR_WORKSPACE');
    });
  });

  describe('when a progress message arrives', () => {
    const state = appReducer(initialState, {
      type: 'WORKSPACE_CREATION_PROGRESS',
      progressMessage: '<This is the progress message>'
    });

    it('should switch to the progress page', () => {
      expect(state.page).toBe('WAITING_FOR_WORKSPACE');
    });

    it('should display the message', () => {
      // we need this if check otherwise typescript will complain
      // that we're accessing a property which might not exist
      if (state.page === 'WAITING_FOR_WORKSPACE') {
        expect(state.progressMessage).toBe('<This is the progress message>');
      }
    });
  });

  describe('when the workspace creation operation is complete', () => {
    const state = appReducer(initialState, {
      type: 'WORKSPACE_CREATION_COMPLETED',
      migrations: [{ filename: 'some filename' }]
    });

    it('should switch to the migration view page', () => {
      // this is another way of making typescript happy
      if (state.page !== 'DISPLAY_MIGRATIONS') {
        throw new Error('should show migrations page');
      }
      expect(state.migrations).toEqual([{ filename: 'some filename' }]);
    });
  });
});
