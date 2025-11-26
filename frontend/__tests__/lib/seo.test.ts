import { createSEODefaults, buildMetadata, createPageMetadata, createArticleMetadata } from '@/lib/seo';

describe('SEO utilities', () => {
  describe('createSEODefaults', () => {
    it('should return default SEO values', () => {
      const defaults = createSEODefaults();
      
      expect(defaults.title).toBe('ManageHub');
      expect(defaults.description).toBe('Smart Hub & Workspace Management System');
      expect(defaults.siteName).toBe('ManageHub');
      expect(defaults.locale).toBe('en_US');
      expect(defaults.type).toBe('website');
    });

    it('should return keywords array', () => {
      const defaults = createSEODefaults();
      
      expect(Array.isArray(defaults.keywords)).toBe(true);
      expect(defaults.keywords).toContain('workspace');
      expect(defaults.keywords).toContain('management');
    });
  });

  describe('buildMetadata', () => {
    it('should return metadata with defaults when no input', () => {
      const metadata = buildMetadata();
      
      expect(metadata.description).toBe('Smart Hub & Workspace Management System');
      expect(metadata.themeColor).toBe('#000000');
    });

    it('should use custom title and description', () => {
      const metadata = buildMetadata({
        title: 'Custom Title',
        description: 'Custom description',
      });
      
      expect(metadata.title).toBe('Custom Title');
      expect(metadata.description).toBe('Custom description');
    });

    it('should set robots to noindex when specified', () => {
      const metadata = buildMetadata({ noindex: true });
      
      expect(metadata.robots).toEqual(
        expect.objectContaining({
          index: false,
          follow: false,
        })
      );
    });

    it('should include canonical URL when provided', () => {
      const metadata = buildMetadata({ canonical: 'https://example.com/page' });
      
      expect(metadata.alternates).toEqual({
        canonical: 'https://example.com/page',
      });
    });

    it('should include image in openGraph when provided', () => {
      const metadata = buildMetadata({
        image: {
          url: 'https://example.com/image.jpg',
          alt: 'Test image',
        },
      });
      
      expect(metadata.openGraph).toEqual(
        expect.objectContaining({
          images: expect.arrayContaining([
            expect.objectContaining({
              url: 'https://example.com/image.jpg',
            }),
          ]),
        })
      );
    });
  });

  describe('createPageMetadata', () => {
    it('should create metadata for a page', () => {
      const metadata = createPageMetadata('About Us', 'About our company');
      
      expect(metadata.title).toBe('About Us');
      expect(metadata.description).toBe('About our company');
    });

    it('should accept additional options', () => {
      const metadata = createPageMetadata('Contact', 'Contact us', {
        noindex: true,
      });
      
      expect(metadata.title).toBe('Contact');
      expect(metadata.robots).toEqual(
        expect.objectContaining({
          index: false,
        })
      );
    });
  });

  describe('createArticleMetadata', () => {
    it('should create metadata with article type', () => {
      const metadata = createArticleMetadata('Blog Post', 'Article content');
      
      expect(metadata.title).toBe('Blog Post');
      expect(metadata.openGraph).toEqual(
        expect.objectContaining({
          type: 'article',
        })
      );
    });

    it('should include published time when provided', () => {
      const metadata = createArticleMetadata('News', 'Latest news', {
        publishedTime: '2024-01-15',
      });
      
      expect(metadata.openGraph).toEqual(
        expect.objectContaining({
          publishedTime: '2024-01-15',
        })
      );
    });
  });
});
