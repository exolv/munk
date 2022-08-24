'use strict';

class Rating extends React.Component {
  constructor(props) {
    super(props);
  }

  renderStar(rating) {
    let star = (
      <svg height='20' width='20'>
        <path className='fill-amber-400' d='m5.062 18 1.313-5.542L2 8.729l5.75-.5L10 3l2.25 5.25 5.75.479-4.375 3.729L14.938 18 10 15.062Z' />
      </svg>
    );

    if (rating >= 0 && rating < 1.67) {
      star = (
        <svg height='20' width='20'>
          <path className='fill-amber-400' d='M7.333 14.896 10 13.312l2.688 1.584-.709-3 2.313-1.979-3.063-.271L10 6.792 8.771 9.646l-3.063.271 2.334 1.979ZM5.062 18l1.313-5.542L2 8.729l5.75-.5L10 3l2.25 5.25 5.75.479-4.375 3.729L14.938 18 10 15.062ZM10 11.062Z' />
        </svg>
      );
    } else if (rating >= 1.67 && rating < 3.34) {
      star = (
        <svg height='20' width='20'>
          <path className='fill-amber-400' d='M10 6.792v6.52l2.688 1.584-.709-3 2.313-1.979-3.063-.271ZM5.062 18l1.313-5.542L2 8.729l5.75-.5L10 3l2.25 5.25 5.75.479-4.375 3.729L14.938 18 10 15.062Z' />
        </svg>
      );
    } else {
      return star;
    }

    return star;
  }

  render() {
    const { rating } = this.props.data;

    return (
      <div className='flex justify-between items-center'>
        {this.renderStar(rating)}
        <span className='text-white ml-2 pt-1'>{rating}</span>
      </div>
    );
  }
}