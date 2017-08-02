import { ReverseCommentPipe } from './reverse-comment.pipe';

describe('ReverseCommentPipe', () => {
  it('create an instance', () => {
    const pipe = new ReverseCommentPipe();
    expect(pipe).toBeTruthy();
  });
});
