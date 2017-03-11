const DummyData = {
  LOREM_LONG: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum has been the industry's
standard dummy text ever since the 1500s, when an unknown
printer took a galley of type and scrambled it to make a
type specimen book. It has survived not only five centuries,
but also the leap into electronic typesetting, remaining
essentially unchanged. It was popularised in the 1960s
with the release of Letraset sheets containing Lorem
Ipsum passages, and more recently with desktop publishing
software like Aldus PageMaker including versions of Lorem Ipsum.
Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum has been the industry's
standard dummy text ever since the 1500s, when an unknown
printer took a galley of type and scrambled it to make a
type specimen book. It has survived not only five centuries,
but also the leap into electronic typesetting, remaining
essentially unchanged. It was popularised in the 1960s
with the release of Letraset sheets containing Lorem
Ipsum passages, and more recently with desktop publishing
software like Aldus PageMaker including versions of Lorem Ipsum.`,

  LOREM_NORMAL: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum has been the industry's
standard dummy text ever since the 1500s, when an
printer took a galley of type and scrambled it to make a
type specimen book. It has survived not only five centuries,`,

  LOREM_SHORT: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum has been the industry's
standard dummy text ever since the 1500s`,

  TOPICS: [
    { id: 0, isTop10: true, name: 'ADHD' },
    { id: 1, isTop10: true, name: 'Ap*parent* dilemma' },
    { id: 2, isTop10: true, name: 'Art class' },
    { id: 3, isTop10: true, name: 'Brain Breaks' },
    { id: 4, isTop10: true, name: 'Business + entrepreneurship' },
    { id: 5, isTop10: true, name: 'Celebrate kindness' },
    { id: 6, isTop10: true, name: 'Cooking/Home Ec' },
    { id: 7, isTop10: true, name: 'Documentation' },
    { id: 8, isTop10: true, name: 'Downloaders' },
    { id: 9, isTop10: false, name: 'Dramatic dudes' },
    { id: 10, isTop10: false, name: 'Dropping the kids off at the pool' },
    { id: 11, isTop10: false, name: 'Downers + Drowsies' },
    { id: 12, isTop10: false, name: 'Foreign Languages' },
    { id: 13, isTop10: false, name: 'Good deeds' },
    { id: 14, isTop10: false, name: 'Inspirational Quotes' },
    { id: 15, isTop10: false, name: 'Just what the doctor ordered' },
    { id: 16, isTop10: false, name: 'Knife fights – sh*t just got real, people.' },
    { id: 17, isTop10: false, name: 'LGBTQA+' },
    { id: 18, isTop10: false, name: 'Mixed Tapes and Shuffle' },
    { id: 19, isTop10: false, name: 'Presentations on Prozac' },
  ],
  TIPS: [
    { id: 0, topicId: 0, isTop10: 0, name: 'It’s not just about Special Ed kids' },
    { id: 1, topicId: 0, isTop10: 0, name: 'Anger Management tips for teachers' },
    { id: 3, topicId: 2, isTop10: 0, name: 'Drawing + Storytelling App' },
    { id: 13, topicId: 8, isTop10: 1, name: 'kids who copy' },
    { id: 14, topicId: 8, isTop10: 1, name: 'Plagarism' },
    { id: 15, topicId: 9, isTop10: 1, name: 'Negative attention seeking behaviors' },
    { id: 32, topicId: 17, isTop10: 2, name: 'Start a GSA group' },
    { id: 33, topicId: 17, isTop10: 2, name: 'Sia, “Bird Set Free.”' },
    { id: 34, topicId: 17, isTop10: 2, name: 'Joseph, “Honest”' },
    { id: 35, topicId: 18, isTop10: 2, name: 'Level Up, Vienna Teng' },
    { id: 36, topicId: 18, isTop10: 2, name: 'Full of Wonder, Emeli Sande' },
  ],
  /*
  TIPS: [
    { id: 0, topicId: 0, isTop10: 0, name: 'It’s not just about Special Ed kids' },
    { id: 1, topicId: 0, isTop10: 0, name: 'Anger Management tips for teachers' },
    { id: 2, topicId: 1, isTop10: 0, name: 'Parent/teacher communication, etc….' },
    { id: 3, topicId: 2, isTop10: 0, name: 'Drawing + Storytelling App' },
    { id: 4, topicId: 3, isTop10: 0, name: 'because there’s only so many GoNoodles you can tolerate' },
    { id: 5, topicId: 4, isTop10: 0, name: 'it’s never too early to teach this kind of savvy' },
    { id: 6, topicId: 4, isTop10: 0, name: 'The Millionaire Fastlane: a book by MJ DeMarco' },
    { id: 7, topicId: 4, isTop10: 0, name: 'Lesson plan for 9-12 Marketing class' },
    { id: 8, topicId: 5, isTop10: 0, name: 'Anti-Bulling Lesson plans' },
    { id: 9, topicId: 5, isTop10: 0, name: 'Stop bullies in their tracks!' },
    { id: 10, topicId: 5, isTop10: 1, name: 'US Gov weighing in on bullying' },
    { id: 11, topicId: 6, isTop10: 1, name: 'Do a link with easy/simple Tasty videos' },
    { id: 12, topicId: 7, isTop10: 1, name: 'Tips for writing papers' },
    { id: 13, topicId: 8, isTop10: 1, name: 'kids who copy' },
    { id: 14, topicId: 8, isTop10: 1, name: 'Plagarism' },
    { id: 15, topicId: 9, isTop10: 1, name: 'Negative attention seeking behaviors' },
    { id: 16, topicId: 9, isTop10: 1, name: 'Do the opposite of what they expect with your reaction' },
    { id: 17, topicId: 10, isTop10: 1, name: 'Hysterical hall passes' },
    { id: 18, topicId: 11, isTop10: 1, name: 'super low-key students' },
    { id: 19, topicId: 11, isTop10: 1, name: 'SPIRITUALITY DECKS' },
    { id: 20, topicId: 11, isTop10: 2, name: 'Use TED Talks!' },
    { id: 21, topicId: 12, isTop10: 2, name: 'DuoLingo' },
    { id: 22, topicId: 13, isTop10: 2, name: 'The ‘pending coffee’ story' },
    { id: 23, topicId: 13, isTop10: 2, name: 'how can you help others initite and redeem them?' },
    { id: 24, topicId: 14, isTop10: 2, name: 'Learn from everything' },
    { id: 25, topicId: 14, isTop10: 2, name: 'Everything will be okay in the end. If it’s not okay, it’s not the end.' },
    { id: 26, topicId: 15, isTop10: 2, name: 'when you need to feel better, like, NOW.' },
    { id: 27, topicId: 15, isTop10: 2, name: 'Rodan+Fields skin-care products' },
    { id: 28, topicId: 16, isTop10: 2, name: 'Physical aggression between students' },
    { id: 29, topicId: 16, isTop10: 2, name: 'Mediation for all ages' },
    { id: 30, topicId: 17, isTop10: 2, name: 'Be a part of creating a safe space.' },
    { id: 31, topicId: 17, isTop10: 2, name: 'Show these videos!' },
    { id: 32, topicId: 17, isTop10: 2, name: 'Start a GSA group' },
    { id: 33, topicId: 17, isTop10: 2, name: 'Sia, “Bird Set Free.”' },
    { id: 34, topicId: 17, isTop10: 2, name: 'Joseph, “Honest”' },
    { id: 35, topicId: 18, isTop10: 2, name: 'Level Up, Vienna Teng' },
    { id: 36, topicId: 18, isTop10: 2, name: 'Full of Wonder, Emeli Sande' },
    { id: 37, topicId: 19, isTop10: 2, name: 'Make all presentations better with Prezi.' },
    { id: 38, topicId: 19, isTop10: 2, name: 'Presentation-making app.' },
  ],*/
};


export default DummyData;
