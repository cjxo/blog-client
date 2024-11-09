import PropTypes from 'prop-types';
import {
  NavButtonStartPosting,
  NavButtonExploreUserPosts,
  NavLinks,
} from "./components/HomepageNav.jsx";
import BlogForgeEmphasis from "./components/BlogForgeEmphasis.jsx";

function FeatureLiEntry({ title, explanation }) {
  return (
    <li className="bf-homepage-feature-desc">
      <h4 className="bf-homepage-feature-heading">{ title }</h4>
      <p>{ explanation }</p>
      <a
        className="bf-button-link-feature-create-your-blog"
        href="#">
        Create Your Blog
      </a>
    </li>
  );
}

function FeatureList() {
  const featureList = [
    {
      id: 1,
      title: "Share Your Mind with the World",
      explanation: `BlogForge is more than just a blogging platform—it's a place where your thoughts, ideas, and passions come to life. Whether you want to share your expertise, tell your story, or express your creativity, BlogForge helps you do it with ease`
    },
    {
      id: 2,
      title: "Engage and Connect Through Comments",
      explanation: `Enable readers to share their thoughts and interact directly with your content through comments. The comments section allows for lively discussions, valuable feedback, and community building around each post. `
    },
    {
      id: 3,
      title: "Effortless Content Management",
      explanation: "Easily organize and manage all your posts, drafts, and published content in one place. Enhance your posts' visibility and organization by adding tags."
    },
    {
      id: 4,
      title: "Like and Show Appreciation",
      explanation: "Readers can show their appreciation with a quick “like” on any post. Likes not only motivate authors but also help surface popular content, giving readers more ways to connect with high-quality posts."
    }
  ];
  return (
    <>
      <section className="bf-homepage-nav-middle">
        <h3 className="bf-homepage-heading">Forge your ideas into powerful blogs</h3> 
        <NavLinks>
          <NavButtonStartPosting />
          <NavButtonExploreUserPosts />
        </NavLinks>
      </section>

      <section className="bf-main-container bf-homepage-features">
        <h3 className="bf-homepage-heading">
          Create, Customize, and Share Your Story with <BlogForgeEmphasis />
        </h3>

        <ul className="bf-homepage-feature-list">
          {
            featureList.map(({ id, title, explanation }) => {
              return <FeatureLiEntry key={id} title={title} explanation={explanation} />
            })
          }
        </ul>
      </section>
    </>
  );
}

FeatureLiEntry.propTypes = {
  title: PropTypes.string.isRequired,
  explanation: PropTypes.string.isRequired,
};

export default FeatureList;
