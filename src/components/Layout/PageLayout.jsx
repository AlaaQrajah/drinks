import Container from '../Container/Container';
import '../../styles/PageLayout.css';
import '../../styles/FormInput.css';

const PageLayout = ({
  children,
  className = '',
  containerClassName = '',
  fluid = false,
  noContainer = false,
}) => {
  const content = noContainer ? (
    children
  ) : (
    <Container className={containerClassName} fluid={fluid}>
      {children}
    </Container>
  );

  return <main className={`page-layout ${className}`}>{content}</main>;
};

export default PageLayout;
