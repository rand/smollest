```tsx
import React from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Container, Heading, Text } from 'theme-ui';
import { BlogPost } from '../types';
import Layout from '../components/Layout';
import BlogPostCard from '../components/BlogPostCard';

interface BlogProps {
  posts: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  const router = useRouter();

  const handlePostClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  return (
    <Layout>
      <NextSeo title="Blog" />
      <Container>
        <Heading as="h1" variant="styles.h1">
          Blog
        </Heading>
        {posts.map((post) => (
          <BlogPostCard
            key={post.slug}
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
            onClick={() => handlePostClick(post.slug)}
          />
        ))}
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const response = await axios.get('https://api.github.com/repos/cheshireai/cheshire.ai/issues');
  const issues = response.data;

  const posts: BlogPost[] = issues.map((issue: any) => ({
    slug: issue.number.toString(),
    title: issue.title,
    date: new Date(issue.created_at).toLocaleDateString(),
    excerpt: issue.body.slice(0, 200),
  }));

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
```