import styled from 'styled-components';

const NewsletterForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <span className="text-center text-xl font-bold">СЛЕДИТЕ ЗА ОБНОВЛЕНИЯМИ</span>
        <p className="description">
          Задайте вопрос администрации.
        </p>
        <div>
          <input 
            placeholder="Ваш email" 
            type="email" 
            name="email" 
            required
          />
          <a 
          className="subscribe-button"
          href='https://t.me/the_ping'
          target="_blank"
          rel="noopener noreferrer"
          >Подписаться</a>
        </div>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  margin-top: 2rem;

  .subscribe-button {
  padding: 0.75rem 1.5rem;
  background: #6366f1;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition: background 0.3s;

  &:hover {
    background: #4f46e5;
  }
}
  .form {
    display: flex;
    flex-direction: column;
    background: #606c88;
    background: linear-gradient(to right, #3f4c6b, #606c88);
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
  }

  .title {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    color: #fff;
  }

  .description {
    line-height: 1.5rem;
    font-size: 1rem;
    margin-top: 1rem;
    color: rgb(209 213 219);
  }

  .form div {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .form div input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    font-size: 1rem;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    &:focus {
      border-color: #6366f1;
      outline: none;
    }
  }

  .form div button {
    padding: 0.75rem 1.5rem;
    background: #6366f1;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #4f46e5;
    }
  }
`;

export default NewsletterForm;